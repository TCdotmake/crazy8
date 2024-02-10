import { useEffect, useState } from "react";
import { motion } from "framer-motion";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DataProvider } from "./DataProvider";
import { DummyChild } from "./DummyChild";
function App() {
  return (
    <DataProvider>
      <DummyChild></DummyChild>
    </DataProvider>
  );
}

export default App;
