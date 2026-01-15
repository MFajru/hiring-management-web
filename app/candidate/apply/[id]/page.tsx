"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import InputLabel from "@/components/customUI/input-with-label";
import DatePicker from "@/components/customUI/date-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { useFetch } from "@/hooks/useFetch";
import { TCandidate } from "@/types";

import { useParams, useRouter } from "next/navigation";
import {
  apiUrl,
  cloudinaryCloudName,
  cloudinaryPreset,
} from "@/lib/environment";
import TakePictureDialog from "./_components/take-picture-dialog";
import { TPhotoURL } from "./_lib/type";
import {
  FORMDATA_INIT,
  phoneCountryCodes,
  PHOTOURL_INIT,
} from "./_lib/initVal";
import SubmitDataDialog from "./_components/submit-data-dialog";

const ApplyJob = () => {
  const params = useParams<{ id: string }>();

  const router = useRouter();

  const canvasPhotoRef = useRef<HTMLCanvasElement>(null);

  const [photoUrl, setPhotoUrl] = useState<TPhotoURL>(PHOTOURL_INIT);
  const [selectedDom, setSelectedDom] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState<string>(
    phoneCountryCodes[0].code
  );
  const [clIsLoading, setClIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<TCandidate>>(FORMDATA_INIT);

  const {
    fetchData: postData,
    isLoading,
    isSuccess,
    setIsSuccess,
  } = useFetch<TCandidate>();

  const handleSubmitPhoto = () => {
    setPhotoUrl((prev) => ({
      ...prev,
      isSubmited: true,
    }));
    setIsDialogOpen(false);
    setFormData((prev) => ({
      ...prev,
      photoProfile: photoUrl.url,
    }));
  };

  const cloudinaryUploadImage = async () => {
    const clFormData = new FormData();
    clFormData.append("file", photoUrl.url);
    clFormData.append("upload_preset", cloudinaryPreset as string);
    try {
      setClIsLoading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: "POST",
          body: clFormData,
        }
      );
      if (!res.ok) {
        throw new Error("Error when posting image");
      }
      const response = await res.json();
      return response;
    } catch (e) {
      throw new Error("Something happen when fetching", { cause: e });
    } finally {
      setClIsLoading(false);
    }
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    const postImage = await cloudinaryUploadImage();

    postData(`${apiUrl}/candidates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        domicile: selectedDom,
        photoProfile: postImage.secure_url,
        jobId: params.id,
        phone: selectedPhoneCountry + formData.phone,
      }),
    });
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOkSubmitted = () => {
    setClIsLoading(false);
    setFormData(FORMDATA_INIT);
    setPhotoUrl(PHOTOURL_INIT);
    setIsSuccess(false);
    setSelectedDate("");
    setSelectedDom("");
    setSelectedPhoneCountry(phoneCountryCodes[0].code);
  };

  useEffect(() => {
    if (selectedDate !== "") {
      setFormData((prev) => ({
        ...prev,
        dob: selectedDate,
      }));
    }
  }, [selectedDate]);

  return (
    <div className="w-screen h-screen bg-[#FAFAFA] flex items-center justify-center py-[50px]">
      <div className="flex flex-col bg-white h-full w-[700px] py-10 border gap-6">
        <div className="flex gap-4 px-10">
          <button
            className="hover:cursor-pointer hover:bg-accent border flex items-center justify-center p-1 rounded-lg shadow-2xs"
            onClick={() => router.back()}
          >
            <ArrowLeft width={20} height={20} />
          </button>
          <h3 className="font-bold text-lg">Apply Frontend at Rakamin</h3>
        </div>
        <form
          className="h-fit overflow-auto px-10"
          id="applyJob"
          name="applyJob"
          onSubmit={handleSubmitForm}
        >
          <div className="flex flex-col px-6 gap-4">
            <p className="text-xs font-bold text-red-500">*Required</p>
            <div className="flex flex-col gap-2">
              <h5 className="font-bold text-xs capitalize">Photo profile</h5>
              <div>
                <Image
                  src={
                    photoUrl.url !== "" && photoUrl.isSubmited
                      ? photoUrl.url
                      : "/avatarMale.png"
                  }
                  alt="avatar picture"
                  height={128}
                  width={128}
                  loading="eager"
                  className={`rounded-full w-32 h-32 object-cover ${
                    photoUrl.url !== "" && photoUrl.isSubmited
                      ? "-scale-x-100"
                      : ""
                  }`}
                />
              </div>
              <TakePictureDialog
                photoUrl={photoUrl}
                setPhotoUrl={setPhotoUrl}
                handleSubmitPhoto={handleSubmitPhoto}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
              />
            </div>
            <InputLabel
              inputId="fullname"
              value={formData.fullName}
              name="fullName"
              inputType="text"
              label="Full name"
              placeholder="Enter your full name"
              isMandatory={true}
              onChange={handleOnChange}
            />
            <DatePicker
              label="Date of birth"
              placeholder="Select date of birth"
              setSelectedDate={setSelectedDate}
            />
            <div className="flex flex-col gap-2">
              <Label className="text-xs" htmlFor="gender">
                Pronoun (gender)
              </Label>
              <RadioGroup
                name="gender"
                className="flex"
                value={formData.gender}
                onChange={handleOnChange}
              >
                <div className="flex items-center gap-2 ">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">She/her (Female)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">He/him (Male)</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs">Domicile</Label>
              <Select value={selectedDom} onValueChange={setSelectedDom}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your domicile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="jakarta">Jakarta</SelectItem>
                    <SelectItem value="lampung">Lampung</SelectItem>
                    <SelectItem value="bandung">Bandung</SelectItem>
                    <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                    <SelectItem value="jayapura">Jayapura</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-xs ">Phone number</Label>
              <InputGroup>
                <InputGroupInput
                  type="text"
                  value={formData.phone}
                  id="phone"
                  name="phone"
                  placeholder="81XXXXXXXX"
                  onChange={handleOnChange}
                />
                <InputGroupAddon>
                  <div className="flex gap-2">
                    <Select
                      value={selectedPhoneCountry}
                      onValueChange={setSelectedPhoneCountry}
                    >
                      <SelectTrigger className="w-full border-0 shadow-none rounded-none p-0">
                        <SelectValue placeholder="Choose your country phone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {phoneCountryCodes.map((item) => (
                            <SelectItem key={item.name} value={item.code}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <span className="border-[0.5px] my-2"></span>
                  </div>
                </InputGroupAddon>
                <InputGroupAddon>
                  <InputGroupText className="text-gray-700">
                    +{selectedPhoneCountry}
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <InputLabel
              inputId="email"
              value={formData.email}
              name="email"
              inputType="text"
              label="Email"
              placeholder="Enter your email address"
              onChange={handleOnChange}
            />
            <InputLabel
              inputId="linkedin"
              value={formData.linkedin}
              name="linkedin"
              inputType="text"
              label="Link linkedin"
              placeholder="https://linkedin.com/in/username"
              onChange={handleOnChange}
            />

            <canvas
              ref={canvasPhotoRef}
              id="canvasElement"
              className="hidden"
            />
          </div>
        </form>
        <div className="flex justify-center items-center border-t pt-6 px-10">
          <SubmitDataDialog
            handleOkSubmitted={handleOkSubmitted}
            isLoading={isLoading}
            isSuccess={isSuccess}
            clIsLoading={clIsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
