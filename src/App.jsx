import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GameProvider } from "./GameProvider";
import { Top } from "./Top";
import { Mid } from "./Mid";
import "./App.css";

const headerFont = css`
  color: var(--off-white);
  font-size: 4rem;
`;

const glowCss = css`
  text-shadow: 1px 1px 0 var(--off-white), -1px -1px 0 var(--off-white);
`;

const suitsCss = css`
  font-size: 2.5rem;
  color: var(--light-red);
`;

function App() {
  return (
    <GameProvider>
      <header
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 3.5rem auto 2rem auto;
        `}
      >
        <h1 css={headerFont} className="julius-sans">
          Crazy{" "}
          <span
            css={css`
              color: var(--light-red);
              font-size: 4.5rem;
            `}
          >
            8
          </span>
          S
        </h1>
      </header>

      <main
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <Top></Top>
        <Mid></Mid>
      </main>
    </GameProvider>
  );
}

export default App;
