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
import { useEffect, useRef, useState } from "react";
import { gestureGenerator } from "../../_lib/gestures";
import { Coords3D } from "@tensorflow-models/handpose/dist/pipeline";

type gestures = {
  numberOne: boolean;
  numberTwo: boolean;
  numberThree: boolean;
};

const ApplyJob = () => {
  const gestures = gestureGenerator();

  const isPhotoTakenRef = useRef<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasPhotoRef = useRef<HTMLCanvasElement>(null);
  const [remainingSec, setRemainingSec] = useState<number>(3);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [gesturesPerformed, setGesturesPerformed] = useState<gestures>({
    numberOne: false,
    numberTwo: false,
    numberThree: false,
  });

  const countdown = () => {
    let remainingSec = 3;

    const timer = setInterval(() => {
      remainingSec--;
      setRemainingSec(remainingSec);
      if (remainingSec <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  const capturePhoto = () => {
    if (canvasPhotoRef.current && videoRef.current) {
      canvasPhotoRef.current.width = videoRef.current.videoWidth;
      canvasPhotoRef.current.height = videoRef.current.videoHeight;

      canvasPhotoRef.current
        .getContext("2d")
        ?.drawImage(videoRef.current, 0, 0);

      const photoDataUrl = canvasPhotoRef.current.toDataURL("image/jpeg");
      setPhotoUrl(photoDataUrl);
      setGesturesPerformed({
        numberOne: false,
        numberTwo: false,
        numberThree: false,
      });
      isPhotoTakenRef.current = false;
      setRemainingSec(3);
    }
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
              !gesturesPerformed[maxConfidenceGesture.name as keyof gestures]
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
    if (
      gesturesPerformed.numberOne &&
      gesturesPerformed.numberTwo &&
      gesturesPerformed.numberThree &&
      !isPhotoTakenRef.current
    ) {
      countdown();
      isPhotoTakenRef.current = true;
      setTimeout(capturePhoto, 3000);
      console.log("duar", gesturesPerformed);
    }
  }, [gesturesPerformed]);

  return (
    <>
      <div className="w-screen h-screen bg-[#FAFAFA] flex items-center justify-center py-[50px]">
        <div className="flex flex-col bg-white h-full w-[700px] p-10 border gap-6">
          <div className="flex gap-4">
            <div className="border flex items-center justify-center p-1 rounded-lg shadow-2xs">
              <ArrowLeft width={20} height={20} />
            </div>
            <h3 className="font-bold text-lg">Apply Frontend at Rakamin</h3>
          </div>
          <div className="flex flex-col px-6 gap-4">
            <p className="text-xs font-bold text-red-500">*Required</p>
            <div className="flex flex-col gap-2">
              <h5 className="font-bold text-xs capitalize">Photo profile</h5>
              <div>
                <Image
                  src={photoUrl !== "" ? photoUrl : "/avatarMale.png"}
                  alt="avatar picture"
                  height={128}
                  width={128}
                  loading="eager"
                  className={`rounded-full w-32 h-32 object-cover ${
                    photoUrl !== "" ? "-scale-x-100" : ""
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
                        className="w-full h-full absolute top-0 left-0 border rounded-md -scale-x-100"
                      />
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
                      />
                      <ChevronRight />
                      <Image
                        src="/openCamera2.png"
                        width={57}
                        height={57}
                        alt="two hand gesture"
                      />
                      <ChevronRight />
                      <Image
                        src="/openCamera1.png"
                        width={57}
                        height={57}
                        alt="one hand gesture"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <div className="w-full flex justify-end mt-2">
                      <Button type="submit">Publish Job</Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <canvas
            ref={canvasPhotoRef}
            id="canvasElement"
            className="hidden"
          ></canvas>
        </div>
      </div>
    </>
  );
};

export default ApplyJob;
