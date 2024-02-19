import { useContext } from "react";
import { GameContext } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Discards } from "./Discards";
import { ChooseSuit } from "./ChooseSuit";
const style = css`
  width: 80px;
  height: auto;
`;
const flexRow = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export function Mid() {
  const game = useContext(GameContext);
  const handleDraw = () => {
    if (game.active) {
      game.dealToP1(1);
    }
  };
  return (
    <div>
      <div css={flexRow}>
        <button onClick={handleDraw}>
          <img
            css={style}
            src="https://www.deckofcardsapi.com/static/img/back.png"
            alt="Draw Pile"
          />
        </button>
        <Discards></Discards>
      </div>
      {game.p1choose && <ChooseSuit></ChooseSuit>}
    </div>
  );
}
