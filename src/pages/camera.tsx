import React, { useRef, useState, useCallback } from "react";
import Webcam, { WebcamProps } from "react-webcam";
import Image from "next/image";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function Camera() {
  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null); // 画像データを保持するためのstate

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current?.getScreenshot();
      console.log(imageSrc);
      setImgSrc(imageSrc); // 取得した画像データをstateにセット
    }
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      {/* <img
        src="/path/to/your/overlay.png"
        alt="Overlay"
        className="overlayImage"
      /> */}
      {/* <Image
        src="/images/sample.png"
        alt="Overly"
        className="overlayImage"
        width={30}
        height={30}
      /> */}
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <Image src={imgSrc} alt="Captured" width={1280} height={720} />
      )}
    </>
  );
}
