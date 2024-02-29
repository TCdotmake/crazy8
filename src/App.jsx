import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GameContext, GameProvider } from "./GameProvider";
import { P1section } from "./P1section";
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
  let game = useContext(GameContext);
  return (
    <GameProvider>
      <header
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 3.5rem auto;
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
        {/* <p
          css={[
            suitsCss,
            css`
              width: 271px;
              text-align: end;
              line-height: 50%;
            `,
          ]}
        >
          ♠<span>♦</span>♣<span>♥</span>
        </p> */}
      </header>
      <main>
        <Top></Top>
        <Mid></Mid>
      </main>
    </GameProvider>
  );
}

export default App;
