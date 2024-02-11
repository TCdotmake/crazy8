import { useContext } from "react";
import { GameContext } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const style = css`
  width: 80px;
  height: auto;
`;
export function P2section() {
  const game = useContext(GameContext);
  const pile = game.p2Pile;
  const onClick = () => {
    game.dealToP2(1);
  };
  return (
    <div>
      <h1>P2</h1>
      <button onClick={onClick}>Deal one card to P2</button>
      <div>
        {pile.length > 0 &&
          pile.map((n) => {
            let alt = n.value + " of " + n.suit;

            return (
              <img css={style} key={n.key + "p2"} src={n.image} alt={alt}></img>
            );
          })}
      </div>
    </div>
  );
}
