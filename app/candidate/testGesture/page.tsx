"use client";

import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import { Button } from "@/components/ui/button";
import {
  numberOneGesture,
  numberThreeGesture,
  numberTwoGesture,
} from "../_lib/gestures";
import { Coords3D } from "@tensorflow-models/handpose/dist/pipeline";

export default function TestGesture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gesture, setGesture] = useState<string>("");

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        console.log("✅ Webcam started.");
      }
    } catch (err) {
      console.error("❌ Error accessing webcam:", err);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const gestureGenerator = () => {
    const oneGesture = new fp.GestureDescription("number_one");
    const twoGesture = new fp.GestureDescription("number_two");
    const threeGesture = new fp.GestureDescription("number_three");
    numberOneGesture(oneGesture);
    numberTwoGesture(twoGesture);
    numberThreeGesture(threeGesture);

    return [oneGesture, twoGesture, threeGesture];
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

  let model: handpose.HandPose | null = null;
  const gestures = gestureGenerator();

  const detectHands = async () => {
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
            setGesture(maxConfidenceGesture.name);
          } else {
            setGesture("");
          }
        }
      }

      requestAnimationFrame(loop);
    };

    loop();
  };

  const run = async () => {
    await tf.ready();
    await startVideo();
    model = await handpose.load();
    console.log("✅ Handpose model loaded.");
    detectHands();
  };

  useEffect(() => {
    run();

    // Cleanup on unmount
    return () => {
      stopWebcam();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative">
        <video
          ref={videoRef}
          width={640}
          height={480}
          className="border rounded-md -scale-x-100"
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="absolute top-0 left-0 border rounded-md -scale-x-100"
        />
      </div>

      <h1 className="text-2xl mt-4 font-semibold">
        {gesture ? `Detected: ${gesture}` : "No gesture detected"}
      </h1>
      <Button variant={"outline"} onClick={() => startVideo()}>
        Start webcam
      </Button>
      <Button variant={"outline"} onClick={() => stopWebcam()}>
        Stop webcam
      </Button>
    </div>
  );
}
