export function Rules() {
  return (
    <div>
      <h2>Rules</h2>
      <h3>Setup</h3>
      <ul>
        <li>Each player is dealt 7 cards at the start</li>
        <li>
          One card from deck is revealed as the <em>top card</em>
        </li>
        <li>
          The last card played becomes the new <em>top card</em>
        </li>
        <li>First player to play all of their cards wins!</li>
      </ul>
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
          <em>8</em> could be played regardless of
          <em>top card's</em> value or suit; in addition, the next player must
          play the suit destinated by current player
        </li>
      </ul>
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
            Draw two: Playing <em>2</em> will cause the next player to draw two
            cards, unless they plays a <em>2</em> as well, in which case the
            effect stacks and the next player must draw 4. This effect stacks
            until a player plays a card other than <em>2</em>
          </label>
        </li>
      </ul>
    </div>
  );
}
