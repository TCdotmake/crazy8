import { createContext, useEffect, useRef, useState } from "react";
import { loadDeck } from "./loadDeck";
import { v4 as uuid } from "uuid";
import { dealCards } from "./dealCards";
const p1 = "player1";
const p2 = "player2";
const discards = "discards";

export const GameContext = createContext(null);

export function GameProvider({ children }) {
  // STATES
  const [deck, setDeck] = useState(null);
  const [loaded, setloaded] = useState(false);
  const [discardPile, setDiscardPile] = useState([]);
  const [p1Pile, setP1Pile] = useState([]);
  const [p2Pile, setP2Pile] = useState([]);
  // END STATES

  // REFS
  const deckCountRef = useRef(null);
  const deckRef = useRef(null);
  deckCountRef.current = 1;
  // END REFS

  // useEffect hooks
  useEffect(() => {
    loadDeck(deckCountRef, setDeck);
  }, []);

  useEffect(() => {
    if (deck) {
      deckRef.current = [...deck];
      deckRef.current.forEach((n) => {
        n.key = uuid();
      });
      setloaded(true);
    }
  }, [deck]);
  // END useEffect hooks

  // helper functions
  function dealCards(numOfCards, setFn) {
    if (numOfCards > deckRef.current.length) {
      // need to handle shuffling discards back into deck

      //placeholder behavior
      return false;
    } else {
      let drawnCards = deckRef.current.splice(0, numOfCards);
      setFn((prev) => {
        return [...prev, ...drawnCards];
      });
      return true;
    }
  }

  function dealToDiscard(n = 1) {
    dealCards(n, setDiscardPile);
  }
  // Context variables
  const game = {
    loaded,
    deckRef,
    discardPile,
    dealToDiscard,
  };

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}
