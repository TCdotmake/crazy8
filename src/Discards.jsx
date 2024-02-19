import { useContext } from "react";
import { GameContext } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const style = css`
  width: 80px;
  height: auto;
`;
export function Discards() {
  const game = useContext(GameContext);
  const pile = game.discardPile;
  let topCard;
  let alt;
  if (pile.length > 0) {
    topCard = pile[pile.length - 1];
    alt = topCard.value + " of " + topCard.suit;
  }

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {pile.length > 0 && (
        <img
          css={style}
          key={topCard.key + "topCard"}
          src={topCard.image}
          alt={alt}
        ></img>
      )}
      {pile.length > 0 && game.wildTurn && (
        <div
          css={css`
            background: orchid;
            width: 50px;
            height: 50px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 500;
          `}
        >
          <div
            css={css`
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              > h3 {
                font-size: 12px;
              }
              > p {
                font-size: 8px;
              }
            `}
          >
            {" "}
            <h3>Crazy 8!</h3>
            <p>{game.validCondition.suit}</p>
          </div>
        </div>
      )}
    </div>
  );
}
