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
  const onClick = () => {
    game.dealToDiscard(1);
  };
  return (
    <div>
      <h1>Discards</h1>
      <button onClick={onClick}>Deal one card to Discard</button>
      <div>
        {pile.length > 0 &&
          pile.map((n) => {
            let alt = n.value + " of " + n.suit;
            return (
              <img
                css={style}
                key={n.key + "discard"}
                src={n.image}
                alt={alt}
              ></img>
            );
          })}
      </div>
    </div>
  );
}
