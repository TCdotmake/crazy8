import { useContext } from "react";
import { CLUBS, DIAMONDS, GameContext, HEARTS, SPADES } from "./GameProvider";

export function ChooseSuit() {
  const game = useContext(GameContext);
  return (
    <div>
      <button
        onClick={() => {
          game.p1setSuit(CLUBS);
        }}
      >
        Club
      </button>
      <button
        onClick={() => {
          game.p1setSuit(DIAMONDS);
        }}
      >
        Diamond
      </button>
      <button
        onClick={() => {
          game.p1setSuit(SPADES);
        }}
      >
        Spade
      </button>
      <button
        onClick={() => {
          game.p1setSuit(HEARTS);
        }}
      >
        heart
      </button>
    </div>
  );
}
