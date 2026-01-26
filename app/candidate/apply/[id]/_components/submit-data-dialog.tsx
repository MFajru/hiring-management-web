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
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TDialogMess, TPhotoURL } from "../_lib/type";
import { Dispatch, SetStateAction } from "react";
import { FORMDATA_INIT, PHOTOURL_INIT } from "../_lib/const";
import { TCandidate } from "@/types";
import { useRouter } from "next/navigation";

type TSubmitDataDialog = {
  isSuccess: boolean;
  isLoading: boolean;
  clIsLoading: boolean;
  dialogMess: TDialogMess;
  isSubmitError: boolean;
  setClIsLoading: Dispatch<SetStateAction<boolean>>;
  setDialogMess: Dispatch<SetStateAction<TDialogMess>>;
  setIsSubmitError: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<Partial<TCandidate>>>;
  setPhotoUrl: Dispatch<SetStateAction<TPhotoURL>>;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  setSelectedDate: Dispatch<SetStateAction<string>>;
  setSelectedDom: Dispatch<SetStateAction<string>>;
  setSelectedPhoneCountry: Dispatch<SetStateAction<string>>;
};

const SubmitDataDialog = ({
  isLoading,
  isSuccess,
  clIsLoading,
  dialogMess,
  isSubmitError,
  setDialogMess,
  setIsSubmitError,
  setClIsLoading,
  setFormData,
  setPhotoUrl,
  setIsSuccess,
  setSelectedDate,
  setSelectedDom,
  setSelectedPhoneCountry,
}: TSubmitDataDialog) => {
  const router = useRouter();

  const handleOkError = () => {
    setTimeout(() => {
      setDialogMess({
        title: "",
        body: "",
      });
      setIsSubmitError(false);
    }, 100);
  };

  const handleOkSubmitted = () => {
    setClIsLoading(false);
    setFormData(FORMDATA_INIT);
    setPhotoUrl(PHOTOURL_INIT);
    setIsSuccess(false);
    setSelectedDate("");
    setSelectedDom("");
    setSelectedPhoneCountry("62");
    router.replace("/candidate");
    setTimeout(() => {
      setDialogMess({
        title: "",
        body: "",
      });
      setIsSubmitError(false);
    }, 100);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full" type="button">
        <p className="w-full bg-[#01959F] text-primary-foreground hover:bg-[#018c96] font-bold hover:cursor-pointer py-2 rounded-md">
          Submit
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {dialogMess.title !== "" ? dialogMess.title : "Apply Job?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {dialogMess.body !== ""
              ? dialogMess.body
              : "The data will be sent to the company, make sure all of the submitted data is correct."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {isLoading || clIsLoading ? (
            <Button variant={"outline"} className="w-24" disabled>
              <Spinner className="size-5" />
            </Button>
          ) : isSuccess || isSubmitError ? (
            <AlertDialogAction asChild>
              {isSubmitError ? (
                <Button onClick={handleOkError}>OK</Button>
              ) : (
                <Button onClick={handleOkSubmitted}>OK</Button>
              )}
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
  );
};

export default SubmitDataDialog;
