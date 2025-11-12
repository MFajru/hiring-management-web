"use client";

import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";

export default function TestGesture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gesture, setGesture] = useState<string>("");

  useEffect(() => {
    let model: handpose.HandPose | null = null;

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // wait until video metadata is loaded, then play
          await new Promise((resolve) => {
            videoRef.current!.onloadedmetadata = () => {
              videoRef.current!.play();
              resolve(true);
            };
          });

          console.log("✅ Webcam started.");
        }
      } catch (err) {
        console.error("❌ Error accessing webcam:", err);
      }
    };

    const detectHands = async () => {
      if (!model || !videoRef.current) return;

      const thumbsDownGesture = new fp.GestureDescription("number one_gesture");
      thumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
      thumbsDownGesture.addDirection(
        fp.Finger.Thumb,
        fp.FingerDirection.VerticalDown,
        1.0
      );

      thumbsDownGesture.addDirection(
        fp.Finger.Thumb,
        fp.FingerDirection.DiagonalDownLeft,
        0.9
      );
      thumbsDownGesture.addDirection(
        fp.Finger.Thumb,
        fp.FingerDirection.DiagonalDownRight,
        0.9
      );

      // do this for all other fingers
      for (const finger of [
        fp.Finger.Index,
        fp.Finger.Middle,
        fp.Finger.Ring,
        fp.Finger.Pinky,
      ]) {
        thumbsDownGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
        thumbsDownGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
      }

      const GE = new fp.GestureEstimator([
        fp.Gestures.VictoryGesture,
        fp.Gestures.ThumbsUpGesture,
        thumbsDownGesture,
      ]);

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

            // draw landmarks
            for (let i = 0; i < landmarks.length; i++) {
              const [x, y] = landmarks[i];

              ctx.beginPath();
              ctx.arc(x, y, 5, 0, 3 * Math.PI);
              ctx.fillStyle = "red";
              ctx.fill();
            }

            // detect gesture
            const gestureEstimate = GE.estimate(landmarks, 8.5);

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

    run();

    // Cleanup on unmount
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
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
    </div>
  );
}
