import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Styles from "@/styles/lists.module.css";
import storage from "@/firebase";
import { ref, listAll, getDownloadURL, list } from "firebase/storage";

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
        <Link href="/">戻る</Link>
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
