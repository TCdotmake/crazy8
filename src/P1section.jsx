import { useContext } from "react";
import { GameContext } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const style = css`
  width: 80px;
  height: auto;
`;

const containerCss = css`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: center;
`;
export function P1section() {
  const game = useContext(GameContext);
  const pile = game.p1Pile;

  const handlePlay = (e) => {
    if (game.playerTurn) {
      const key = e.target.dataset.key;
      game.p1PlayCard(key);
    }
  };
  return (
    <div css={containerCss}>
      {pile.length > 0 &&
        pile.map((n, index) => {
          let alt = n.value + " of " + n.suit;
          let mid = (pile.length - 1) / 2;
          let offset = (index - mid) * -1;
          return (
            <button onClick={handlePlay} key={n.key + "btn"} data-key={n.key}>
              <img
                css={css`
                  width: 80px;
                  transform: translateX(calc(${offset} * 40px));
                `}
                key={n.key + "p1"}
                src={n.image}
                alt={alt}
                data-key={n.key}
              ></img>
            </button>
          );
        })}
    </div>
  );
}
