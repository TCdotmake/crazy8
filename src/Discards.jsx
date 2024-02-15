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
    <div>
      {pile.length > 0 && (
        <img
          css={style}
          key={topCard.key + "topCard"}
          src={topCard.image}
          alt={alt}
        ></img>
      )}
    </div>
  );
}
