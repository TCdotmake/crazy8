import { useContext, useEffect, useState } from "react";
import { GameContext } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const flexRow = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const buttonCss = css`
  height: 32px;
  border: 1px solid var(--off-white);
  border-radius: 5px;
  padding: 0.5ch 1ch;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: var(--off-white);
`;

const navBarCss = css`
  width: 298px;
  justify-content: flex-start;
  gap: 1ch;
  & button,
  & a {
    ${buttonCss}
  }
  & button:nth-child(2) {
    margin-left: auto;
  }

  & a {
    text-decoration: none;
  }
`;

export function Top() {
  const game = useContext(GameContext);
  const [active, setActive] = useState(false);

  function toggleActive() {
    setActive((prev) => !prev);
  }
  const handleClick = () => {
    active ? game.resetGame() : game.newGame();
    toggleActive();
  };

  return (
    <div>
      {" "}
      <div css={[flexRow, navBarCss]}>
        <button onClick={handleClick}>
          {(active && "Reset") || "New Game"}
        </button>
        <button
          onClick={game.toggleRules}
          css={
            game.showRules &&
            css`
              background: var(--off-white);
              color: var(--dark-bg) !important;
            `
          }
        >
          Rules
        </button>
        <a href="https://github.com/TCdotmake/crazy8" target="_blank">
          GitHub
        </a>
      </div>{" "}
    </div>
  );
}
