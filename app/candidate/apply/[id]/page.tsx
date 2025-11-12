"use client";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ChevronRight, Upload } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const ApplyJob = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream>();

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      canvasRef.current.getContext("2d")?.drawImage(videoRef.current, 0, 0);

      const photoDataUrl = canvasRef.current.toDataURL("image/jpeg");
      setPhotoUrl(photoDataUrl);
    }
  };

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: videoRef.current?.width,
          height: videoRef.current?.height,
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  // const handleGesture = () => {
  //   // add "✌🏻" and "👍" as sample gestures
  //   const GE = new fp.GestureEstimator([
  //     fp.Gestures.VictoryGesture,
  //     fp.Gestures.ThumbsUpGesture,
  //   ]);
  // };

  useEffect(() => {
    if (!isDialogOpen && videoRef.current && stream) {
      const tracks = stream.getTracks();
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
    }
  }, [isDialogOpen, stream]);

  useEffect(() => {
    console.log(
      "height",
      videoRef.current?.height,
      "width",
      videoRef.current?.width
    );
  });

  return (
    <>
      <Script src="https://unpkg.com/@tensorflow/tfjs-core@3.7.0/dist/tf-core.js"></Script>
      <Script src="https://unpkg.com/@tensorflow/tfjs-converter@3.7.0/dist/tf-converter.js"></Script>

      <Script src="https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.js"></Script>

      <Script src="https://unpkg.com/@tensorflow-models/handpose@0.0.7/dist/handpose.js"></Script>

      <Script src="fingerpose.js" type="text/javascript"></Script>

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
                  src={"/avatarMale.png"}
                  alt="avatar picture"
                  height={128}
                  width={128}
                />
              </div>
              {/* <div className="flex flex-col">
              <h1>Webcam Capture</h1>

              <video
                ref={videoRef}
                width={400}
                height={200}
                className="border -scale-x-100"
                id="videoElement"
                autoPlay
              ></video>

              <button id="startButton" onClick={() => startWebcam()}>
                Start Webcam
              </button>
              <button id="captureButton" onClick={() => capturePhoto()}>
                Capture Photo
              </button>
              <canvas
                ref={canvasRef}
                id="canvasElement"
                className="hidden"
              ></canvas>
              {photoUrl && (
                <Image
                  src={photoUrl}
                  alt="test"
                  width={400}
                  height={200}
                  id="photoElement"
                  className="-scale-x-100"
                />
              )}
            </div> */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    id="takePicture"
                    name="takePicture"
                    variant="outline"
                    className="w-fit"
                    onClick={() => startWebcam()}
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
                    <video
                      ref={videoRef}
                      width={560}
                      height={315}
                      className="border -scale-x-100"
                      id="videoElement"
                      autoPlay
                    />
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
              {/* <div>
              <Label htmlFor="photoProfile">
                <div className="flex gap-1 border px-4 py-1 rounded-md justify-center items-center shadow-2xs cursor-pointer">
                  <Upload width={16} height={16} strokeWidth={3} />
                  <p className="text-sm font-bold">Take a picture</p>
                </div>
              </Label>
              <Input
                type="file"
                id="photoProfile"
                name="photoProfile"
                className="w-fit hidden"
                accept="image/*"
                capture="user"
              />
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyJob;
