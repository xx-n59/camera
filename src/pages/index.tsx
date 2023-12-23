import React, { useRef, useState, useCallback, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import styled from "styled-components";
import storage from "@/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
// import "../path/to/font.css";
import MyDocument from "./_document";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const listRef = ref(storage, "images/");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const listRef = ref(storage, "images/");
    listAll(listRef)
      .then((res) => {
        const promises = res.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => url)
        );
        return Promise.all(promises);
      })
      .then((urls) => {
        setImages(urls);
      })
      .catch((error) => {
        console.log("Error retrieving images:", error);
      });
  }, []);
  return (
    <>
      <div className={styles.body}>
        <header>{/* <h1>カメラアプリ</h1> */}</header>
        <div className={styles.startbtn}>
          <Link href="/camera" legacyBehavior>
            <a className={styles.startlink}>START</a>
          </Link>
        </div>
        <p className={styles.title}>みんなの写真</p>
        <div className={styles.imgsContainer}>
          {images.map((url) => (
            <Image
              key={url}
              src={url}
              alt="Uploaded Image"
              width={300}
              height={250}
              className={styles.imgElement}
            />
          ))}
        </div>
      </div>
    </>
  );
}
