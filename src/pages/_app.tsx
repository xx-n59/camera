import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import styled from "styled-components";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
