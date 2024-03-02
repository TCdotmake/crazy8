import { useContext } from "react";
import { GameContext } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Discards } from "./Discards";
import { ChooseSuit } from "./ChooseSuit";
import { P1section, cardSizeCss } from "./P1section";
import { Deck } from "./Deck";
import { Rules } from "./Rules";
import { WinMsg } from "./WinMsg";

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
  > div {
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

const cardIconCss = css`
  width: 18px;
  aspect-ratio: 2.5/3.5;
  border: 3px solid var(--off-white);
  border-radius: 5px;
`;

const counterContainerCss = css`
  margin: 1rem 0 0.5rem 0;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1ch;
  align-items: center;
  > p {
    color: var(--off-white);
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 1.5rem;
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
    <div
      css={css`
        position: relative;
      `}
    >
      {!game.showRules && (
        <div css={counterContainerCss}>
          <p>CPU </p>
          <div css={cardIconCss}></div>
          <p>X</p>
          <p>{game.p2show}</p>
        </div>
      )}
      <div
        css={[
          flexRow,
          deckContainerCss,
          css`
            position: relative;
          `,
        ]}
      >
        {!game.showRules && (
          <>
            {game.winner && <WinMsg></WinMsg>}
            {game.p1choose && <ChooseSuit></ChooseSuit>}
            <Deck></Deck>
            <Discards></Discards>
          </>
        )}
      </div>

      {!game.showRules && <P1section></P1section>}
      {game.showRules && <Rules></Rules>}
    </div>
  );
}
