/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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
`;

const sectionContainer = css`
  border: 1px solid var(--off-white);
  border-radius: 20px;
  padding: 2ch;
  & h3 {
    line-height: 200%;
  }

  & ul {
    padding-left: 3ch;
  }

  & li {
    font-size: 14px;
    line-height: 150%;
  }
`;

export function Rules() {
  return (
    <div css={[fontsCss, containerCss]} className="lato-light">
      <h2>Rules</h2>
      <div css={sectionContainer}>
        <h3>Setup</h3>
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
      </div>

      <div css={sectionContainer}>
        <h3>How to play</h3>
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
            <em> 8 </em> could be played regardless of
            <em> top card's</em> value or suit; in addition, the next player
            must play the suit destinated by current player
          </li>
        </ul>
      </div>

      <div css={sectionContainer}>
        <h3>Optional rules</h3>
        <ul>
          <li>
            <input type="checkbox" id="queenSkip"></input>
            <label for="queenSkip">
              Queen skip: playing <em>Queen</em> skips next player's turn
            </label>
          </li>
          <li>
            {" "}
            <input type="checkbox" id="drawTwo"></input>
            <label for="drawTwo">
              Draw two: Playing <em>2</em> will cause the next player to draw 2
              cards, the penalty can be stacked and passed on if a<em> 2 </em>{" "}
              is played dring your turn turn.
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
