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
    <div css={flexRow}>
      <button onClick={handleClick}>{(active && "Reset") || "New Game"}</button>
      <p>{`CPU X ${game.p2show}`}</p>
    </div>
  );
}
