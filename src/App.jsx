import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GameProvider } from "./GameProvider";
import { P1section } from "./P1section";
import { Top } from "./Top";
import { Mid } from "./Mid";
import "./App.css";
function App() {
  return (
    <GameProvider>
      <header>
        <h1>Crazy 8!</h1>
      </header>
      <main>
        <Top></Top>
        <Mid></Mid>
        <P1section></P1section>
      </main>
    </GameProvider>
  );
}

export default App;
