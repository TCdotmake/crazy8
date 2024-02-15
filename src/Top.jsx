import { useContext } from "react";
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
  return (
    <div css={flexRow}>
      <button onClick={game.active ? game.resetGame : game.newGame}>
        {game.active ? "Reset" : "New Game"}
      </button>
      <p>{`CPU X ${game.p2Pile.length}`}</p>
    </div>
  );
}