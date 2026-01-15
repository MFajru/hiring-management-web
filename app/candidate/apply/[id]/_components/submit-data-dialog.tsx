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

type TSubmitDataDialog = {
  handleOkSubmitted: () => void;
  isSuccess: boolean;
  isLoading: boolean;
  clIsLoading: boolean;
};

const SubmitDataDialog = ({
  handleOkSubmitted,
  isLoading,
  isSuccess,
  clIsLoading,
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
  );
};

export default SubmitDataDialog;
