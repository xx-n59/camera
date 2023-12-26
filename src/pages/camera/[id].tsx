import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import Styles from "../../styles/camera.module.css";
import html2canvas from "html2canvas";
import storage from "../../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { ST } from "next/dist/shared/lib/utils";
import { domToCanvas, domToPng } from "modern-screenshot";
import { useRouter } from "next/router";
import { toPng } from "html-to-image";
import MentorList from "../../mentor.json";
import { GetStaticProps } from "next";
import { GetStaticPaths } from "next";

const videoConstraints = {
  // width: 400,
  // height: 800,
  facingMode: "user",
};

export const getStaticPaths: GetStaticPaths = async () => {
  // mentor.jsonからすべてのmentorのidを取得してpathsを生成
  const paths = MentorList.mentorLists.map((mentor) => ({
    params: { id: mentor.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const mentor = MentorList.mentorLists.find((m) => m.id.toString() === id);

  if (!mentor) {
    return { props: {} };
  }

  return {
    props: {
      mentorName: mentor.name,
      mentorImage: mentor.path,
    },
  };
};

type CameraProps = {
  mentorImage: string;
};

export default function Camera({ mentorImage }: CameraProps) {
  const router = useRouter();
  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  //現在のパスを取得
  const pathname = router.pathname;
  const query = router.query;
  console.log(pathname, query);
  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current?.getScreenshot();
      // console.log(imageSrc);
      setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc]);

  const toImgRef = useRef<HTMLDivElement>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const uploadToFirebase = (url: string) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        // Firebase Storageの参照を作成
        const storage = getStorage();
        const now = new Date();
        const getFormattedDate = (date: Date) => date.toISOString();
        const storageRef = ref(storage, `images/${getFormattedDate(now)}.jpg`);
        //     // BlobをFirebase Storageにアップロード
        return uploadBytes(storageRef, blob);
      })
      //
      .then((snapshot) => {
        console.log("画像がアップロードされました。", snapshot);
        router.push("/result");
      })
      .catch((error) => {
        console.error("アップロード中にエラーが発生しました。", error);
      });
  };

  // const capturefull = useCallback(() => {
  //   if (toImgRef.current === null) {
  //     return;
  //   }
  //   html2canvas(toImgRef.current).then((canvas) => {
  //     const dataUrl = canvas.toDataURL("image/png");
  //     setDownloadLink(dataUrl);
  //     uploadToFirebase(dataUrl);
  //   });
  // }, [toImgRef, setDownloadLink]);

  const capturefull = () => {
    if (toImgRef.current === null) {
      return;
    }

    toPng(toImgRef.current, { cacheBust: true })
      .then((dataUrl) => {
        setDownloadLink(dataUrl);
        uploadToFirebase(dataUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // // <button
  //   onClick={() => {
  //     capture();
  //     capturefull();
  //   }}
  // >
  //   写真を撮る
  // </button>;

  return (
    <>
      <div className={Styles.cameraContainer} ref={toImgRef}>
        <Webcam
          audio={false}
          // height={800}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          // width={400}
          videoConstraints={videoConstraints}
          className={Styles.webcam}
          // mirrored={true}
          style={{ scale: "-1 1" }}
        />
        <div className={Styles.overlayContainer}>
          <img className={Styles.overlayImg} src={mentorImage} alt="Overlay" />
        </div>
      </div>
      <div className={Styles.captureContainer}>
        <div className={Styles.captureBtnContainer}>
          <Link href="/result" legacyBehavior>
            <a>
              <button
                onClick={() => {
                  capture();
                  capturefull();
                  // OnFileUploadToFirebase();
                }}
                className={Styles.captureBtn}
              >
                <FontAwesomeIcon icon={faCamera} />
              </button>
            </a>
          </Link>
        </div>
        {/* {downloadLink && (
          <div className={Styles.imageContainer}>
            <Image
              className={Styles.image}
              src={downloadLink}
              alt="captured-image.png"
              width={1200}
              height={1000}
            />
          </div>
        )} */}
      </div>
    </>
  );
}
