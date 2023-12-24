import React, { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import storage from "@/firebase";
import Styles from "../styles/result.module.css";
import Link from "next/link";

export default function Result() {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const listRef = ref(storage, "images/");
    listAll(listRef)
      .then((res) => {
        const promises = res.items.map((itemRef) => getDownloadURL(itemRef));
        return Promise.all(promises);
      })
      .then((urls) => {
        if (urls.length > 0) {
          setImage(urls[urls.length - 1]);
        }
      })
      .catch((error) => {
        console.error("画像の取得に失敗しました:", error);
      });
  }, []);

  return (
    <div className={Styles.body}>
      <div>
        {image && (
          <Image
            src={image}
            alt="Uploaded Image"
            height={800}
            width={400}
            layout="responsive"
          />
        )}
      </div>
      <div className={Styles.tolistBtn}>
        <Link href="/lists" legacyBehavior>
          <a className={Styles.tolist}>一覧へ</a>
        </Link>
      </div>
    </div>
  );
}
