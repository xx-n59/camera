import React from "react";
import Styles from "../styles/search.module.css";
import MentorList from "../mentor.json";
import Link from "next/link";

export default function Search() {
  let num = Math.floor(Math.random() * MentorList.mentorLists.length + 1);

  return (
    <div className={Styles.mentorContainer}>
      <p className={Styles.mentorTitle}>
        メンターを選択しよう！
        <br />
        2パターンあるよ!
      </p>
      <ul className={Styles.lists}>
        <Link href={`/camera/${num}`} legacyBehavior>
          <a className={Styles.name}>random</a>
        </Link>
        {MentorList.mentorLists.map((mentor) => (
          <li key={mentor.id}>
            <Link href={`/camera/${mentor.id}`} legacyBehavior>
              <a className={Styles.name}>{mentor.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
