import { useContext } from "react";
import { CLUBS, DIAMONDS, GameContext, HEARTS, SPADES } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { absCenterCss } from "./Mid";

const iconCss = css`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  font-size: 3rem;
  color: var(--light-red);
`;

const containerCss = css`
  background: var(--off-white);

  z-index: 1000;
  > p {
    font-size: 1.5rem;
  }
`;

const suitDivCss = css`
  > * {
    margin-right: 0.8rem;
  }
  > button {
    height: 50px;
    ${iconCss}
  }
  > button:nth-child(odd) {
    color: var(--dark-font);
  }
`;

export function ChooseSuit() {
  const game = useContext(GameContext);
  return (
    <span
      css={[
        containerCss,
        absCenterCss,
        css`
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1rem 0;
        `,
      ]}
    >
      <p>Choose a suit:</p>
      <div css={suitDivCss}>
        <button
          onClick={() => {
            game.p1setSuit(SPADES);
          }}
        >
          ♠
        </button>
        <button
          onClick={() => {
            game.p1setSuit(DIAMONDS);
          }}
        >
          ♦
        </button>
        <button
          onClick={() => {
            game.p1setSuit(CLUBS);
          }}
        >
          ♣
        </button>
        <button
          onClick={() => {
            game.p1setSuit(HEARTS);
          }}
        >
          ♥
        </button>
      </div>
    </span>
  );
}
