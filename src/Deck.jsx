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
        `}
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
            color: white;
            background: grey;
          `}
          onClick={handleDraw}
        >
          Draw
        </p>
      )}
    </div>
  );
}
