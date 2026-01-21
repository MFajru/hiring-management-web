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
import { TDialogMess } from "../_lib/type";

type TSubmitDataDialog = {
  handleOkSubmitted: () => void;
  handleOkError: () => void;
  isSuccess: boolean;
  isLoading: boolean;
  clIsLoading: boolean;
  dialogMess: TDialogMess;
  isSubmitError: boolean;
};

const SubmitDataDialog = ({
  handleOkSubmitted,
  handleOkError,
  isLoading,
  isSuccess,
  clIsLoading,
  dialogMess,
  isSubmitError,
}: TSubmitDataDialog) => {
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
