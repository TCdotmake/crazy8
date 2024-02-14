import { useEffect, useState } from "react";
import { motion } from "framer-motion";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GameProvider } from "./GameProvider";
import { DummyChild } from "./DummyChild";
import { Discards } from "./Discards";
import { P1section } from "./P1section";
import { P2section } from "./P2section";
import { Top } from "./Top";
function App() {
  return (
    <GameProvider>
      <header>
        <h1>Crazy 8!</h1>
      </header>
      <main>
        <Top></Top>
      </main>
      <DummyChild></DummyChild>
      <Discards></Discards>
      <P1section></P1section>
      <P2section></P2section>
    </GameProvider>
  );
}

export default App;
