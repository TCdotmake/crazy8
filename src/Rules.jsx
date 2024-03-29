/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TriangleSVG } from "./TriangleSVG";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { RuleSection } from "./RuleSection";
import { GameContext } from "./GameProvider";
import { buttonCss } from "./Top";
const fontsCss = css`
  color: var(--off-white);
  & em {
    font-weight: 400;
    font-style: normal;
  }
`;

const containerCss = css`
  width: 350px;

  padding: 2ch;
  & h2 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
`;

export const sectionContainer = css`
  border: 1px solid var(--off-white);
  border-radius: 20px;
  padding: 2ch;
  margin-bottom: 0.75rem;
  & span {
    display: grid;
    grid-template-columns: 3rem auto;
    align-items: start;
    gap: 1ch;
    margin-top: 1.5rem;
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: var(--off-white);
    color: var(--dark-bg);
    padding: 0 1rem;
    border-radius: 1rem;
  }
  & h3 {
    line-height: 200%;
    font-size: 1.2rem;
  }

  & ul {
    padding-left: 3ch;
    margin-top: 0.5rem;
  }

  & li,
  & label {
    font-size: 0.8rem;
    line-height: 150%;
  }

  & p {
    margin: 0.5rem 0;
  }

  & em {
    font-size: 0.9rem;
  }
`;

export function Rules() {
  const game = useContext(GameContext);

  const setupTitle = "Setup";
  const setupContent = (
    <ul>
      <li>Each player is dealt 7 cards at the start</li>
      <li>
        One card from deck is revealed as the<em> top card </em>
      </li>
      <li>
        The last card played becomes the new<em> top card</em>
      </li>
      <li>First player to play all of their cards wins!</li>
    </ul>
  );

  const howTitle = "How to Play";
  const howContent = (
    <>
      <p>On your turn, you may play a card if:</p>
      <ul>
        <li>
          The cards's value matches the <em>top card's</em> value
        </li>
        <li>
          The cards's suit matches the <em>top card's</em> suit
        </li>
        <li>
          <em>Crazy 8s!</em>
          <em> 8 </em> could be played at anytime; in addition, the next player
          must play the suit destinated by current player
        </li>
      </ul>
    </>
  );

  const handleQueenSkip = (e) => {
    game.setQueenSkip((n) => !n);
  };

  const handleTwoDraw = (e) => {
    game.setTwoDraw((n) => !n);
  };

  const switchCss = css`
    ${buttonCss}
  `;

  const onCss = css`
    background: var(--off-white);
    color: var(--dark-bg);
  `;

  const optionalTitle = "Optional Rules";
  const optionalContent = (
    <>
      <span>
        <button
          onClick={handleQueenSkip}
          css={[switchCss, game.queenSkip && onCss]}
        >
          {(game.queenSkip && "On") || "Off"}
        </button>
        <label>
          Queen skip: playing <em>Queen</em> skips next player's turn
        </label>
      </span>

      <span>
        <button
          onClick={handleTwoDraw}
          css={[switchCss, game.twoDraw && onCss]}
        >
          {(game.twoDraw && "On") || "Off"}
        </button>
        <label for="drawTwo">
          Draw two: Playing <em>2</em> will cause the next player to draw 2
          cards
        </label>
      </span>
    </>
  );

  return (
    <div css={[fontsCss, containerCss]} className="lato-light">
      <RuleSection title={setupTitle} content={setupContent}></RuleSection>
      <RuleSection title={howTitle} content={howContent}></RuleSection>
      <RuleSection
        title={optionalTitle}
        content={optionalContent}
      ></RuleSection>
    </div>
  );
}
