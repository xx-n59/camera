import React from "react";
import Styles from "../styles/search.module.css";
import { faUserNurse } from "@fortawesome/free-solid-svg-icons";
import { json } from "stream/consumers";
import { GetStaticProps } from "next";
import MentorList from "../mentor.json";
import Link from "next/link";

export default function Search() {
  return (
    <div>
      <ul>
        {MentorList.mentorLists.map((mentor) => (
          <li key={mentor.id}>
            <Link href={`/camera/${mentor.id}`} legacyBehavior>
              <a>{mentor.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
