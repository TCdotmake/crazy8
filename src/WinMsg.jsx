/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { absCenterCss } from "./Mid";
import { containerCss } from "./ChooseSuit";
import { useContext } from "react";
import { GameContext } from "./GameProvider";
export function WinMsg() {
  const game = useContext(GameContext);
  const win = `You win!!!`;
  const lost = `You lost!!!`;
  return (
    <span
      css={[
        absCenterCss,
        containerCss,
        css`
          color: var(--light-red);
          padding: 1.5rem 0;
          > p {
            font-size: 2.5rem;
          }
        `,
      ]}
    >
      <p>{(game.winner == 1 && win) || lost}</p>
    </span>
  );
}
