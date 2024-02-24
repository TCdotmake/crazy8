import { useContext } from "react";
import { GameContext } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { cardSizeCss } from "./P1section";
import { absCenterCss } from "./Mid";

const stickyCss = css`
  background: orchid;
  width: 50px;
  height: 50px;
  z-index: 500;
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
      <p
        css={css`
          z-index: 100;
        `}
      >
        Discards
      </p>

      {pile.length > 0 &&
        pile.map((card) => {
          return (
            <div
              css={css`
                z-index: 200;
              `}
            >
              <img
                src={card.image}
                alt={`${card.value} of ${card.suit}`}
                key={`${card.key}dis`}
                css={[
                  cardSizeCss,
                  css`
                    ${card.disCss}
                  `,
                ]}
              ></img>
            </div>
          );
        })}

      {pile.length > 0 && game.wildTurn && (
        <div
          css={[
            absCenterCss,
            stickyCss,
            css`
              z-index: 300;
            `,
          ]}
        >
          <h3>Crazy 8!</h3>
          <p>{game.validCondition.suit}</p>
        </div>
      )}
    </div>
  );
}
