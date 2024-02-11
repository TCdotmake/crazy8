import { createContext, useEffect, useRef, useState } from "react";
import { loadDeck } from "./loadDeck";
import { v4 as uuid } from "uuid";
import _ from "lodash";
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
      let copy = structuredClone(discardPile);
      let topCard = copy.pop();
      copy = [...copy, ...structuredClone(deckRef.current)];
      copy = _.shuffle(copy);
      setDiscardPile([topCard]);
      deckRef.current = [...copy];

      if (numOfCards > deckRef.current.length) {
        return false;
      } else {
        executeDraw();
        return true;
      }
    } else {
      executeDraw();
      return true;
    }

    function executeDraw() {
      let drawnCards = deckRef.current.splice(0, numOfCards);
      setFn((prev) => {
        return [...prev, ...drawnCards];
      });
    }
  }

  function dealToDiscard(n = 1) {
    dealCards(n, setDiscardPile);
  }
  function dealToP1(n = 1) {
    dealCards(n, setP1Pile);
  }
  function dealToP2(n = 1) {
    dealCards(n, setP2Pile);
  }
  function newGame() {
    dealToP1(7);
    dealToP2(7);
    dealToDiscard(1);
    console.log(deckRef.current.length);
  }
  function resetGame() {
    deckRef.current = _.shuffle([
      ...deckRef.current,
      ...discardPile,
      ...p1Pile,
      ...p2Pile,
    ]);
    setDiscardPile([]);
    setP1Pile([]);
    setP2Pile([]);
    console.log(deckRef.current.length);
  }
  function playCard(key, player, setFn) {
    //get index
    let index = -1;
    for (let i = 0; i < player.length; i++) {
      if (player[i].key === key) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      let copy = structuredClone(player);
      let card = copy.splice(index, 1);
      setFn([...copy]);
      setDiscardPile((prev) => {
        return [...prev, ...card];
      });
    }
  }
  function p1PlayCard(key) {
    playCard(key, p1Pile, setP1Pile);
  }
  function p2PlayCard(key) {
    playCard(key, p2Pile, setP2Pile);
  }
  // Context variables
  const game = {
    loaded,
    deckRef,
    discardPile,
    dealToDiscard,
    p1Pile,
    dealToP1,
    p2Pile,
    dealToP2,
    resetGame,
    newGame,
    p1PlayCard,
    p2PlayCard,
  };

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}
