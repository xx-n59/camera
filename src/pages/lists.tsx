import React, { useRef, useState, useCallback, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Styles from "@/styles/lists.module.css";
import storage from "@/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Link from "next/link";

export default function Lists() {
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
      <div className={Styles.listsContainer}>
        <p className={Styles.title}>みんなの写真</p>
      </div>
      <div className={Styles.imgsContainer}>
        {images.map((url) => (
          <Image
            key={url}
            src={url}
            alt="Uploaded Image"
            width={640}
            height={322}
            className={Styles.imgElement}
          />
        ))}
      </div>
    </>
  );
}
