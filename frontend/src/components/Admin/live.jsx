import React, { useState, useEffect, useRef } from "react";

export default function LiveClass() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  useEffect(() => {
    const startStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    startStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn((prev) => !prev);
    }
  };

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMicOn((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Google Meet</h1>

      <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-64 bg-black rounded-md mb-4 object-cover"
        />

        <div className="flex justify-center space-x-6">
          <button
            onClick={toggleCamera}
            className={`px-4 py-2 rounded-md ${
              isCameraOn ? "bg-green-600" : "bg-red-600"
            } hover:opacity-80`}
          >
            {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
          </button>

          <button
            onClick={toggleMic}
            className={`px-4 py-2 rounded-md ${
              isMicOn ? "bg-green-600" : "bg-red-600"
            } hover:opacity-80`}
          >
            {isMicOn ? "Mute Mic" : "Unmute Mic"}
          </button>
        </div>
      </div>
    </div>
  );
}
