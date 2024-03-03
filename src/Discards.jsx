import { useContext } from "react";
import { CLUBS, DIAMONDS, GameContext, SPADES } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { cardSizeCss } from "./P1section";
import { absCenterCss } from "./Mid";
import { AnimatePresence, delay, motion } from "framer-motion";

const stickyCss = css`
  background: #fff8f0;
  width: 85px;
  aspect-ratio: 1/1;
  z-index: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  clip-path: polygon(
    0 20%,
    20% 0,
    100% 0,
    100% 0,
    100% 100%,
    100% 100%,
    0 100%,
    0 100%,
    0% 20%
  );

  > h3 {
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-style: normal;
    font-size: 0.8rem;
  }
  > p {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    font-size: 2.5rem;
    line-height: 70%;
  }
`;

function getSuit(suit) {
  let result = "♥";
  if (suit == SPADES) {
    result = "♠";
  } else if (suit == DIAMONDS) {
    result = "♦";
  } else if (suit == CLUBS) {
    result = "♣";
  }
  let color = css`
    color: var(--off-white);
    background: var(--dark-bg);
  `;
  if (result == "♦" || result == "♥") {
    color = css`
      color: white;
      background: var(--light-red);
    `;
  }
  return (
    <div
      css={[
        absCenterCss,
        css`
          z-index: 300;
          filter: drop-shadow(0 0 8px var(--dark-bg));
        `,
      ]}
    >
      <div
        css={[
          stickyCss,
          color,
          css`
            transform: rotate(5deg);
          `,
        ]}
      >
        <h3>Crazy 8!</h3>
        <p>{result}</p>
      </div>
    </div>
  );
}

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
          color: var(--off-white);
        `}
        className="julius-sans"
      >
        Discards
      </p>
      <AnimatePresence>
        {pile.length > 0 &&
          pile.map((card, index) => {
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  x: -50,
                  transition: { delay: index * 0.05 },
                }}
                key={`${card.key}div`}
                css={css`
                  z-index: 200;
                  display: grid;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <div
                  css={[
                    card.disCss,
                    css`
                      position: relative;
                    `,
                  ]}
                >
                  <img
                    src={card.image}
                    alt={`${card.value} of ${card.suit}`}
                    key={`${card.key}dis`}
                    css={[
                      cardSizeCss,
                      css`
                        z-index: 200;
                        ${absCenterCss}
                      `,
                    ]}
                  ></img>

                  {card.wild && getSuit(game.validCondition.suit)}
                </div>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}
