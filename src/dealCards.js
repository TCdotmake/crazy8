import { useContext } from "react";
import { GameContext } from "./GameProvider";
export function dealCards(numOfCards, setFn) {
  const game = useContext(GameContext);
  if (numOfCards > game.deckRef.length) {
    // need to handle shuffling discards back into deck

    //placeholder behavior
    return false;
  } else {
    let drawnCards = deckRef.splice(0, numOfCards);
    setFn((prev) => {
      return [...prev, ...drawnCards];
    });
    return true;
  }
}
