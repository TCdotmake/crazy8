import { useContext } from "react";
import { GameContext } from "./GameProvider";
import { cardSizeCss } from "./P1section";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export function Deck() {
  const game = useContext(GameContext);
  const handleDraw = () => {
    if (game.active) {
      game.dealToP1(1);
    }
  };
  return (
    <div>
      <p
        css={css`
          z-index: 100;
          color: var(--off-white);
        `}
        className="julius-sans"
      >
        Deck
      </p>
      {game.gameStart && (
        <button
          onClick={handleDraw}
          css={css`
            z-index: 200;
          `}
        >
          <img
            css={cardSizeCss}
            src="https://www.deckofcardsapi.com/static/img/back.png"
            alt="Draw Pile"
          ></img>
        </button>
      )}

      {game.active && (
        <p
          css={css`
            z-index: 300;
            color: var(--off-white);
            font-size: 1.5rem;
            background: var(--dark-bg);
            padding: 0.5rem;
            border-radius: 5px;
            border: 2px solid var(--off-white);
            box-shadow: 0 0 5px var(--dark-bg);
          `}
          onClick={handleDraw}
        >
          Draw
        </p>
      )}
    </div>
  );
}
