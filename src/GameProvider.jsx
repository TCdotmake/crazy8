import { createContext, useEffect, useRef, useState } from "react";
import { loadDeck } from "./loadDeck";
import { v4 as uuid } from "uuid";
import _ from "lodash";
const p1 = "player1";
const p2 = "player2";
const discards = "discards";
const PASSED = 1;
const WILD = 2;
const FAILED = 3;
const ANY = "any";
const CLUBS = "CLUBS";
const DIAMONDS = "DIAMONDS";
const HEARTS = "HEARTS";
const SPADES = "SPADES";

export const GameContext = createContext(null);

export function GameProvider({ children }) {
  // STATES
  const [deck, setDeck] = useState(null);
  const [loaded, setloaded] = useState(false);
  const [discardPile, setDiscardPile] = useState([]);
  const [p1Pile, setP1Pile] = useState([]);
  const [p2Pile, setP2Pile] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [solution, setSolution] = useState([]);
  // END STATES

  // REFS
  const deckCountRef = useRef(null);
  const deckRef = useRef(null);
  deckCountRef.current = 1;
  const [validCondition, setValidCondition] = useState({});
  const p1wild = useRef(null);
  const p2wild = useRef(null);
  p1wild.current = "8";
  p2wild.current = "8";
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

  //run createSolution at least once when turn changes
  useEffect(() => {
    if (playerTurn) {
      setSolution([]);
    }
    if (!playerTurn) {
      setSolution([...createSolution()]);
    }
  }, [playerTurn]);

  useEffect(() => {
    console.log(solution);
    if (!playerTurn) {
      if (solution.length >= 1) {
        p2PlayCard(solution[0].key);
      } else {
        dealToP2(1);
      }
    }
  }, [solution]);

  useEffect(() => {
    if (!playerTurn && p2Pile.length >= 1) {
      setSolution([...createSolution()]);
    }
  }, [p2Pile]);

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

  function updateValidCondition(turn, card) {
    let condition = {
      value: card.value,
      suit: card.suit,
      wild: turn ? p1wild.current : p2wild.current,
    };
    setValidCondition({ ...condition });
  }

  function dealToDiscard(n = 1) {
    //get the first card
    const card = structuredClone(deckRef.current[0]);
    //set conditions

    updateValidCondition(true, card);
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
    setPlayerTurn(true);
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
  }
  function getIndex(key, player) {
    let index = -1;
    for (let i = 0; i < player.length; i++) {
      if (player[i].key === key) {
        index = i;
        break;
      }
    }
    return index;
  }
  function getCard(key, player) {
    return player[getIndex(key, player)];
  }
  function playCard(key, player, setFn) {
    //get index
    let index = getIndex(key, player);
    if (index != -1) {
      let copy = structuredClone(player);
      let card = copy.splice(index, 1)[0];
      setFn([...copy]);
      setDiscardPile((prev) => {
        return [...prev, card];
      });
    }
  }
  function p1PlayCard(key) {
    let card = getCard(key, p1Pile);
    let result = validatePlay(card);
    if (result != FAILED) {
      let cardCount = p1Pile.length;
      playCard(key, p1Pile, setP1Pile);
      if (cardCount == 1) {
        console.log("P1 Win!");
      } else {
        setPlayerTurn(false);
        if (result == WILD) {
          console.log("need to hand wild");
        }
        updateValidCondition(false, card);
      }
    }
  }
  function p2PlayCard(key) {
    let card = getCard(key, p2Pile);
    let result = validatePlay(card);
    if (result != FAILED) {
      let cardCount = p2Pile.length;
      playCard(key, p2Pile, setP2Pile);
      if (cardCount == 1) {
        console.log("P2 Won!");
      } else {
        setPlayerTurn(true);
        if (result == WILD) {
          console.log("need to hand wild");
        }
        updateValidCondition(true, card);
      }
    }
  }
  function validatePlay(card) {
    if (card.suit == validCondition.suit) {
      return PASSED;
    } else if (
      validCondition.value == ANY ||
      card.value == validCondition.value
    ) {
      return PASSED;
    } else if (card.value == validCondition.wild) {
      return WILD;
    } else {
      return FAILED;
    }
  }

  function CPUaction() {
    console.log("Entered CPU action");
    setSolution([...arr]);

    // p2PlayCard(solution[0].key);
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
    playerTurn,
    getCard,
    validatePlay,
  };

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;

  function createSolution() {
    let copy = structuredClone(p2Pile);
    let cardsObj = {
      [CLUBS]: { cards: [] },
      [DIAMONDS]: { cards: [] },
      [HEARTS]: { cards: [] },
      [SPADES]: { cards: [] },
    };
    copy.map((card) => {
      card.result = validatePlay(card);
      cardsObj[`${card.suit}`].cards.push(card);
    });

    copy = [];
    _.forEach(cardsObj, (n) => {
      n.cards = _.sortBy(n.cards, ["result"]);
      copy.push(n.cards);
    });
    copy.sort(function (a, b) {
      return b.length - a.length;
    });

    let sortedArr = [];
    _.forEach(copy, (n) => {
      sortedArr = [...sortedArr, ...n];
    });

    sortedArr = sortedArr.filter((n) => n.result != FAILED);

    return sortedArr;
  }
}
