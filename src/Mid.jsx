import { useContext } from "react";
import { GameContext } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Discards } from "./Discards";
import { ChooseSuit } from "./ChooseSuit";
import { P1section, cardSizeCss } from "./P1section";
import { Deck } from "./Deck";
import { Rules } from "./Rules";

const flexRow = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const absCenterCss = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const deckContainerCss = css`
  > * {
    width: calc(var(--card-width) + 30px);
    height: calc(var(--card-height) + 34px);
    border: 3px solid var(--off-white);
    border-radius: 10px;
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
        {!game.showRules && (
          <>
            <Deck></Deck>
            <Discards></Discards>
          </>
        )}
      </div>
      {game.p1choose && <ChooseSuit></ChooseSuit>}
      {!game.showRules && <P1section></P1section>}
      {game.showRules && <Rules></Rules>}
    </div>
  );
}
