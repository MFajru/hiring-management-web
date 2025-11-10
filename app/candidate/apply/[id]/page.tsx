"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ApplyJob = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  return (
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
            <div className="flex flex-col">
              <h1>Webcam Capture</h1>

              <video
                ref={videoRef}
                width={570}
                height={428}
                className="border"
                id="videoElement"
                autoPlay
              ></video>

              <button id="startButton" onClick={() => startWebcam()}>
                Start Webcam
              </button>
              <button id="captureButton">Capture Photo</button>
              <canvas id="canvasElement" className="hidden"></canvas>
              <Image
                src={"/avatarMale.png"}
                alt="test"
                width={100}
                height={100}
                id="photoElement"
                className="hidden"
              ></Image>
            </div>
            <div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
