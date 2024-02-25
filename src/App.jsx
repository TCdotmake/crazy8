import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GameContext, GameProvider } from "./GameProvider";
import { P1section } from "./P1section";
import { Top } from "./Top";
import { Mid } from "./Mid";
import "./App.css";
function App() {
  let game = useContext(GameContext);
  return (
    <GameProvider>
      <header
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        `}
      >
        <h1>Crazy 8s!</h1>
      </header>
      <main>
        <Top></Top>
        <Mid></Mid>
      </main>
    </GameProvider>
  );
}

export default App;
