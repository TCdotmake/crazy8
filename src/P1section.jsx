import { useContext } from "react";
import { GameContext } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const style = css`
  width: 80px;
  height: auto;
`;
export function P1section() {
  const game = useContext(GameContext);
  const pile = game.p1Pile;
  const onClick = () => {
    game.dealToP1(1);
  };
  const handlePlay = (e) => {
    if (game.playerTurn) {
      const key = e.target.dataset.key;
      game.p1PlayCard(key);
    }
  };
  return (
    <div>
      <h1>P1</h1>
      <button onClick={onClick}>Deal one card to P1</button>
      <div>
        {pile.length > 0 &&
          pile.map((n) => {
            let alt = n.value + " of " + n.suit;
            return (
              <button onClick={handlePlay} key={n.key + "btn"} data-key={n.key}>
                <img
                  css={style}
                  key={n.key + "p1"}
                  src={n.image}
                  alt={alt}
                  data-key={n.key}
                ></img>
              </button>
            );
          })}
      </div>
    </div>
  );
}
