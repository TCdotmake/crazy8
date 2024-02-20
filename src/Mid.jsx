import { useContext } from "react";
import { GameContext } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Discards } from "./Discards";
import { ChooseSuit } from "./ChooseSuit";
import { cardSizeCss } from "./P1section";
import { Deck } from "./Deck";

const flexRow = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const absCenterCss = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const deckContainerCss = css`
  > * {
    width: calc(var(--card-width) + 10px);
    height: calc(var(--card-height) + 14px);
    border: 1px solid red;
    position: relative;
    > * {
      ${absCenterCss}
    }
  }
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
      <div css={[flexRow, deckContainerCss]}>
        <Deck></Deck>
        <Discards></Discards>
      </div>
      {game.p1choose && <ChooseSuit></ChooseSuit>}
    </div>
  );
}
