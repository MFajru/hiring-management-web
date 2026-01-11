"use client";
import * as fp from "fingerpose";
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, ChevronRight, Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { gestureGenerator } from "../../_lib/gestures";
import { Coords3D } from "@tensorflow-models/handpose/dist/pipeline";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { useParams, useRouter } from "next/navigation";
import {
  apiUrl,
  cloudinaryCloudName,
  cloudinaryPreset,
} from "@/lib/environment";
import { CldUploadButton } from "next-cloudinary";

type TGestures = {
  numberOne: boolean;
  numberTwo: boolean;
  numberThree: boolean;
};

type TPhotoURL = {
  url: string;
  isSubmited: boolean;
};

const PHOTO_TIMER = 3;

const FORMDATA_INIT = {
  photoProfile: "",
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  domicile: "",
  gender: "",
  linkedin: "",
  jobId: "",
};

const PHOTOURL_INIT = {
  url: "",
  isSubmited: false,
};

const ApplyJob = () => {
  const gestures = gestureGenerator();

  const params = useParams<{ id: string }>();

  const router = useRouter();

  const isPhotoTakenRef = useRef<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasPhotoRef = useRef<HTMLCanvasElement>(null);

  const [remainingSec, setRemainingSec] = useState<number>(PHOTO_TIMER);
  const [photoUrl, setPhotoUrl] = useState<TPhotoURL>(PHOTOURL_INIT);
  const [selectedDom, setSelectedDom] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [gesturesPerformed, setGesturesPerformed] = useState<TGestures>({
    numberOne: false,
    numberTwo: false,
    numberThree: false,
  });
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [clIsLoading, setClIsLoading] = useState<boolean>(false);

  const {
    fetchData: postData,
    isLoading,
    isSuccess,
    setIsSuccess,
  } = useFetch<TCandidate>();
  const [formData, setFormData] = useState<Partial<TCandidate>>(FORMDATA_INIT);

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
      }),
    });
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const countdown = () => {
    let remainingSec = PHOTO_TIMER;

    const timer = setInterval(() => {
      remainingSec--;
      setRemainingSec(remainingSec);
      if (remainingSec <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  const handleOkSubmitted = () => {
    setClIsLoading(false);
    setFormData(FORMDATA_INIT);
    setPhotoUrl(PHOTOURL_INIT);
    setIsSuccess(false);
  };

  const capturePhoto = () => {
    if (canvasPhotoRef.current && videoRef.current) {
      canvasPhotoRef.current.width = videoRef.current.videoWidth;
      canvasPhotoRef.current.height = videoRef.current.videoHeight;

      canvasPhotoRef.current
        .getContext("2d")
        ?.drawImage(videoRef.current, 0, 0);

      const photoDataUrl = canvasPhotoRef.current.toDataURL("image/jpeg");

      setPhotoUrl({ url: photoDataUrl, isSubmited: false });
      setGesturesPerformed({
        numberOne: false,
        numberTwo: false,
        numberThree: false,
      });
      isPhotoTakenRef.current = false;
      stopWebcam();
    }
    setRemainingSec(PHOTO_TIMER);
  };

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      console.log("Webcam started.");
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
    isPhotoTakenRef.current = false;
  };

  const drawLandmarks = (
    landmarks: Coords3D,
    ctx: CanvasRenderingContext2D
  ) => {
    for (let i = 0; i < landmarks.length; i++) {
      const [x, y] = landmarks[i];

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 3 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  };

  const detectHands = async (model: handpose.HandPose | null) => {
    if (!model || !videoRef.current) return;

    const GE = new fp.GestureEstimator(gestures);

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const loop = async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        const predictions = await model!.estimateHands(videoRef.current);
        ctx.clearRect(
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height
        );

        if (predictions.length > 0) {
          const landmarks = predictions[0].landmarks;

          drawLandmarks(landmarks, ctx);

          const gestureEstimate = GE.estimate(landmarks as never, 8.5);

          if (gestureEstimate?.gestures?.length) {
            const gestures = gestureEstimate.gestures;
            const maxConfidenceGesture = gestures.reduce((prev, current) =>
              prev.score > current.score ? prev : current
            );

            if (
              !gesturesPerformed[maxConfidenceGesture.name as keyof TGestures]
            ) {
              setGesturesPerformed((prev) => ({
                ...prev,
                [maxConfidenceGesture.name]: true,
              }));
            }
          }
        }
      }

      requestAnimationFrame(loop);
    };

    loop();
  };

  const takeAPhoto = async () => {
    await tf.ready();
    const model = await handpose.load();
    console.log("✅ Handpose model loaded.");
    await startWebcam();
    detectHands(model);
  };

  useEffect(() => {
    if (!isDialogOpen && videoRef.current) {
      stopWebcam();
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (selectedDate !== "") {
      setFormData((prev) => ({
        ...prev,
        dob: selectedDate,
      }));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (
      gesturesPerformed.numberOne &&
      gesturesPerformed.numberTwo &&
      gesturesPerformed.numberThree &&
      !isPhotoTakenRef.current
    ) {
      countdown();
      isPhotoTakenRef.current = true;
      setTimeout(capturePhoto, PHOTO_TIMER * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gesturesPerformed]);

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
                {/* <CldUploadButton
                  signatureEndpoint={"/api/sign-cloudinary-params"}
                  uploadPreset={cloudinaryPreset}
                  className="bg-blue-500 w-24"
                /> */}
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
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    id="takePicture"
                    name="takePicture"
                    variant="outline"
                    className="w-fit"
                    onClick={() => takeAPhoto()}
                  >
                    <div className="flex gap-1 justify-center items-center">
                      <Upload width={16} height={16} strokeWidth={3} />
                      <p className="text-sm font-bold">Take a picture</p>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-1/2">
                  <DialogDescription className="sr-only">
                    Take a picture
                  </DialogDescription>
                  <DialogHeader>
                    <DialogTitle>Raise Your Head to Capture</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col justify-center items-center w-full gap-4">
                    <div className="relative">
                      {photoUrl.url !== "" ? (
                        <Image
                          src={photoUrl.url}
                          alt="Photo taken"
                          width={640}
                          height={480}
                          className="-scale-x-100"
                        />
                      ) : (
                        <>
                          <video
                            ref={videoRef}
                            width={640}
                            height={480}
                            className="border -scale-x-100"
                            id="videoElement"
                            autoPlay
                            playsInline
                            muted
                          />
                          <canvas
                            ref={canvasRef}
                            width={640}
                            height={480}
                            className={`${
                              gesturesPerformed.numberOne &&
                              gesturesPerformed.numberTwo &&
                              gesturesPerformed.numberThree
                                ? "hidden"
                                : "w-full h-full absolute top-0 left-0 border rounded-md -scale-x-100"
                            }`}
                          />
                        </>
                      )}

                      {isPhotoTakenRef.current && (
                        <>
                          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
                          <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
                            <p className="text-4xl text-center text-white">
                              {remainingSec}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    {photoUrl.url === "" && (
                      <>
                        <p className="text-xs text-[#1D1F20]">
                          To take a picture, follow the hand poses in the order
                          shown below. The system will automatically capture the
                          image once the final pose is detected.
                        </p>
                        <div className="flex gap-2 w-full justify-center items-center">
                          <Image
                            src="/openCamera3.png"
                            width={57}
                            height={57}
                            alt="three hand gesture"
                            className={`border-3 ${
                              gesturesPerformed.numberThree
                                ? "border-green-500"
                                : "border-gray-400"
                            }`}
                          />
                          <ChevronRight />
                          <Image
                            src="/openCamera2.png"
                            width={57}
                            height={57}
                            alt="two hand gesture"
                            className={`${
                              gesturesPerformed.numberThree ? "border-3" : ""
                            } ${
                              gesturesPerformed.numberTwo
                                ? "border-green-500"
                                : "border-gray-400"
                            }`}
                          />
                          <ChevronRight />
                          <Image
                            src="/openCamera1.png"
                            width={57}
                            height={57}
                            alt="one hand gesture"
                            className={`${
                              gesturesPerformed.numberThree &&
                              gesturesPerformed.numberTwo
                                ? "border-3"
                                : ""
                            } ${
                              gesturesPerformed.numberOne
                                ? "border-green-500"
                                : "border-gray-400"
                            }`}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <DialogFooter className="justify-center">
                    {photoUrl.url !== "" && (
                      <div className="w-full flex justify-center items-center mt-2 gap-4">
                        <Button
                          type="button"
                          variant={"outline"}
                          onClick={() => {
                            setPhotoUrl({ url: "", isSubmited: false });
                            takeAPhoto();
                          }}
                        >
                          Retake Photo
                        </Button>
                        <Button type="button" onClick={handleSubmitPhoto}>
                          Submit
                        </Button>
                      </div>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                  id="phone"
                  name="phone"
                  placeholder="81XXXXXXXX"
                  onChange={handleOnChange}
                />
                <InputGroupAddon>
                  <div className="flex gap-2">
                    <Select defaultValue="id">
                      <SelectTrigger className="w-full border-0 shadow-none rounded-none p-0">
                        <SelectValue placeholder="Choose your country phone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="id">ID</SelectItem>
                          <SelectItem value="usa">USA</SelectItem>
                          <SelectItem value="uk">UK</SelectItem>
                          <SelectItem value="uae">UAE</SelectItem>
                          <SelectItem value="tha">THA</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <span className="border-[0.5px] my-2"></span>
                  </div>
                </InputGroupAddon>
                <InputGroupAddon>
                  <InputGroupText className="text-gray-700">+62</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <InputLabel
              inputId="email"
              name="email"
              inputType="text"
              label="Email"
              placeholder="Enter your email address"
              onChange={handleOnChange}
            />
            <InputLabel
              inputId="linkedin"
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
          <AlertDialog>
            <AlertDialogTrigger className="w-full" type="button">
              <p className="w-full bg-[#01959F] text-primary-foreground hover:bg-[#018c96] font-bold hover:cursor-pointer py-2 rounded-md">
                Submit
              </p>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isSuccess ? "Data Submitted" : "Apply Job?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {isSuccess
                    ? "Data submitted successfully."
                    : "The data will be sent to the company, make sure all of the submitted data is correct."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {isLoading || clIsLoading ? (
                  <Button variant={"outline"} className="w-24" disabled>
                    <Spinner className="size-5" />
                  </Button>
                ) : isSuccess ? (
                  <AlertDialogAction asChild>
                    <Button onClick={handleOkSubmitted}>OK</Button>
                  </AlertDialogAction>
                ) : (
                  <>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button type="submit" form="applyJob">
                      Submit
                    </Button>
                  </>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
