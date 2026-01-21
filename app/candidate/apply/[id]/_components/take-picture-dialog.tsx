"use client";

import * as tf from "@tensorflow/tfjs";
import * as fp from "fingerpose";
import * as handpose from "@tensorflow-models/handpose";
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
import { ChevronRight, Upload } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Coords3D } from "@tensorflow-models/handpose/dist/pipeline";
import { gestureGenerator } from "@/app/candidate/_lib/gestures";
import Image from "next/image";
import { TPhotoURL } from "../_lib/type";

type TGestures = {
  numberOne: boolean;
  numberTwo: boolean;
  numberThree: boolean;
};

type TTakePictureDialog = {
  photoUrl: TPhotoURL;
  isDialogOpen: boolean;
  errorMsg?: string;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  setPhotoUrl: Dispatch<SetStateAction<TPhotoURL>>;
  handleSubmitPhoto: () => void;
};

const PHOTO_TIMER = 3;

const TakePictureDialog = ({
  photoUrl,
  isDialogOpen,
  errorMsg,
  setIsDialogOpen,
  setPhotoUrl,
  handleSubmitPhoto,
}: TTakePictureDialog) => {
  const gestures = gestureGenerator();

  const isPhotoTakenRef = useRef<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasPhotoRef = useRef<HTMLCanvasElement>(null);

  const [remainingSec, setRemainingSec] = useState<number>(PHOTO_TIMER);
  const [gesturesPerformed, setGesturesPerformed] = useState<TGestures>({
    numberOne: false,
    numberTwo: false,
    numberThree: false,
  });

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

  useEffect(() => {
    if (!isDialogOpen && videoRef.current) {
      stopWebcam();
    }
  }, [isDialogOpen]);

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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <canvas ref={canvasPhotoRef} id="canvasElement" className="hidden" />
      <DialogTrigger asChild>
        <div className="flex items-center gap-4">
          <Button
            id="takePicture"
            name="takePicture"
            variant="outline"
            className={`w-fit ${errorMsg !== "" ? "border-red-500" : ""}`}
            onClick={() => takeAPhoto()}
          >
            <div className="flex gap-1 justify-center items-center">
              <Upload width={16} height={16} strokeWidth={3} />
              <p className="text-sm font-bold">Take a picture</p>
            </div>
          </Button>
          <p className="text-xs text-red-500">{errorMsg}</p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-1/2">
        <DialogDescription
          className={`sr-only ${errorMsg !== "" ? "text-red-500" : ""}`}
        >
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
                To take a picture, follow the hand poses in the order shown
                below. The system will automatically capture the image once the
                final pose is detected.
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
                    gesturesPerformed.numberThree && gesturesPerformed.numberTwo
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
  );
};

export default TakePictureDialog;
