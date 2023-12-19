import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import Styles from "../styles/camera.module.css";
import { toPng } from "html-to-image";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function Camera() {
  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current?.getScreenshot();
      // console.log(imageSrc);
      setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc]);

  const toImgRef = useRef<HTMLDivElement>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const capturefull = useCallback(() => {
    if (toImgRef.current === null) {
      return;
    }

    toPng(toImgRef.current, { cacheBust: true })
      .then((dataUrl) => {
        setDownloadLink(dataUrl);
        console.log(dataUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toImgRef]);

  return (
    <div ref={toImgRef}>
      <div className={Styles.cameraContainer}>
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
          className={Styles.webcam}
        />
        <div className={Styles.overlayContainer}>
          <Image
            src="/images/sample.png"
            alt="Overlay"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <button
        onClick={() => {
          capture();
          capturefull();
        }}
      >
        Capture photo
      </button>
      {downloadLink && (
        <Image
          src={downloadLink}
          alt="captured-image.png"
          // style={{ display: "block", marginTop: "10px" }}
          width={1280}
          height={720}
        />
      )}
    </div>
  );
}
