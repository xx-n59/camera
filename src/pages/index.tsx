import React, { useRef, useState, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import styled from "styled-components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <header>{/* <h1>カメラアプリ</h1> */}</header>
      <Link href="/camera">START</Link>
    </>
  );
}
