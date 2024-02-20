import { useContext } from "react";
import { GameContext } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const style = css`
  width: 80px;
  height: auto;
`;

export const cardSizeCss = css`
  width: var(--card-width);
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
  const ARRSIZE = 8;
  const game = useContext(GameContext);
  const pile = game.p1Pile;
  const copy = structuredClone(pile);
  const multiArr = [];
  while (copy.length > ARRSIZE) {
    const sub = copy.splice(0, ARRSIZE);
    multiArr.push(sub);
  }
  multiArr.push(copy);

  const handlePlay = (e) => {
    if (game.playerTurn) {
      const key = e.target.dataset.key;
      game.p1PlayCard(key);
    }
  };
  return (
    <div
      css={[
        containerCss,
        css`
          flex-direction: column;
        `,
      ]}
    >
      {/* {pile.length > 0 &&
        pile.map((n, index) => {
          let alt = n.value + " of " + n.suit;
          let mid = (pile.length - 1) / 2;
          let offset = index - mid;
          let margin = offset > 0 ? "marginLeft" : "marginRight";
          let val = Math.abs(offset) * 20 * -1;

          return (
            <button
              css={css`
                transform: translateX(calc(-85px * ${offset}));
              `}
              onClick={handlePlay}
              key={n.key + "btn"}
              data-key={n.key}
            >
              <img
                css={cardSizeCss}
                key={n.key + "p1"}
                src={n.image}
                alt={alt}
                data-key={n.key}
              ></img>
            </button>
          );
        })} */}

      {multiArr.length > 0 &&
        multiArr.map((sub) => {
          return (
            <div css={containerCss}>
              {sub.length > 0 &&
                sub.map((n, index) => {
                  let alt = n.value + " of " + n.suit;
                  let mid = (sub.length - 1) / 2;
                  let offset = index - mid;
                  let margin = offset > 0 ? "marginLeft" : "marginRight";
                  let val = Math.abs(offset) * 20 * -1;

                  return (
                    <button
                      css={css`
                        transform: translateX(calc(-85px * ${offset}));
                      `}
                      onClick={handlePlay}
                      key={n.key + "btn"}
                      data-key={n.key}
                    >
                      <img
                        css={cardSizeCss}
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
        })}
    </div>
  );
}
