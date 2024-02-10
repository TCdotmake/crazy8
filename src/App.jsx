import { useEffect, useState } from "react";
import { motion } from "framer-motion";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GameProvider } from "./GameProvider";
import { DummyChild } from "./DummyChild";
import { Discards } from "./Discards";
function App() {
  return (
    <GameProvider>
      <DummyChild></DummyChild>
      <Discards></Discards>
    </GameProvider>
  );
}

export default App;
