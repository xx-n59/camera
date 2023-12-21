import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import Styles from "../styles/camera.module.css";
import html2canvas from "html2canvas";
// import storage from "../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const videoConstraints = {
  width: 1200,
  height: 1000,
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

  // const capturefull = useCallback(() => {
  //   if (toImgRef.current === null) {
  //     return;
  //   }
  //   html2canvas(toImgRef.current).then((canvas) => {
  //     const dataUrl = canvas.toDataURL("image/png");
  //     setDownloadLink(dataUrl);
  //     console.log(dataUrl);
  //   });
  // }, [toImgRef, setDownloadLink]);

  // const uploadToFirebase = (dataUrl) => {
  //   // Base64エンコードされた文字列からBlobを作成
  //   fetch(dataUrl)
  //     .then((res) => res.blob())
  //     .then((blob) => {
  //       // Firebase Storageの参照を作成
  //       const storage = getStorage();
  //       const storageRef = ref(storage, "image/aaa.jpg");

  //       // BlobをFirebase Storageにアップロード
  //       return uploadBytes(storageRef, blob);
  //     })
  //     .then((snapshot) => {
  //       console.log("画像がアップロードされました。", snapshot);
  //     })
  //     .catch((error) => {
  //       console.error("アップロード中にエラーが発生しました。", error);
  //     });
  // };

  // ...
  const uploadToFirebase = (url: string) => {
    // Base64エンコードされた文字列からBlobを作成
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        // Firebase Storageの参照を作成
        const storage = getStorage();
        const storageRef = ref(storage, "image/aaa.jpg");

        // BlobをFirebase Storageにアップロード
        return uploadBytes(storageRef, blob);
      })
      .then((snapshot) => {
        console.log("画像がアップロードされました。", snapshot);
      })
      .catch((error) => {
        console.error("アップロード中にエラーが発生しました。", error);
      });
  };

  const capturefull = useCallback(() => {
    if (toImgRef.current === null) {
      return;
    }
    html2canvas(toImgRef.current).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      setDownloadLink(dataUrl);
      // ここでアップロード処理を呼び出す
      uploadToFirebase(dataUrl);
    });
  }, [toImgRef, setDownloadLink]);

  <button
    onClick={() => {
      capture();
      capturefull();
      // ここではアップロード処理を呼び出さない
    }}
  >
    写真を撮る
  </button>;

  // ...
  return (
    <React.Fragment>
      <div ref={toImgRef} className={Styles.cameraContainer}>
        <Webcam
          audio={false}
          height={1000}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1200}
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
      <div className={Styles.captureBtnContainer}>
        <button
          onClick={() => {
            capture();
            capturefull();
            // OnFileUploadToFirebase();
          }}
          className={Styles.captureBtn}
        >
          写真を撮る
        </button>
      </div>
      {downloadLink && (
        <div className={Styles.imageContainer}>
          <Image
            className={Styles.image}
            src={downloadLink}
            alt="captured-image.png"
            width={1200}
            height={1000}
          />
        </div>
      )}
    </React.Fragment>
  );
}
