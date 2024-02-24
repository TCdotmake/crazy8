import { useContext } from "react";
import { GameContext } from "./GameProvider";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
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

const initial = { opacity: 0 };
const animate = { opacity: 1 };

const staggerMotion = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 10,
    },
  },
};

export function P1section() {
  const ARRSIZE = 7;
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
          > *:first-child {
            margin-top: 0;
          }
        `,
      ]}
    >
      {multiArr.length > 0 &&
        multiArr.map((sub, subInd) => {
          const subZ = subInd * 100;
          return (
            <motion.div
              css={[
                containerCss,
                css`
                  margin-top: -110px;
                  z-index: ${subZ};
                `,
              ]}
              variants={staggerMotion}
              initial="initial"
              animate="animate"
            >
              {sub.length > 0 &&
                sub.map((n, index) => {
                  let alt = n.value + " of " + n.suit;
                  let mid = (sub.length - 1) / 2;
                  let offset = index - mid;

                  return (
                    <motion.button
                      initial={{ opacity: 0, y: 100 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        x: -80 * offset,
                      }}
                      css={css`
                        z-index: ${subZ + index};
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
                    </motion.button>
                  );
                })}
            </motion.div>
          );
        })}
    </div>
  );
}
