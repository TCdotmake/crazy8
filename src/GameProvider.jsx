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
export const CLUBS = "CLUBS";
export const DIAMONDS = "DIAMONDS";
export const HEARTS = "HEARTS";
export const SPADES = "SPADES";

export const GameContext = createContext(null);

export function GameProvider({ children }) {
  // STATES
  const [active, setActive] = useState(false);
  const [deck, setDeck] = useState(null);
  const [loaded, setloaded] = useState(false);
  const [discardPile, setDiscardPile] = useState([]);
  const [p1Pile, setP1Pile] = useState([]);
  const [p2Pile, setP2Pile] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [solution, setSolution] = useState([]);
  const [wildTurn, setWildTurn] = useState(false);
  const [p1choose, setp1choose] = useState(false);
  const [p2choose, setp2choose] = useState(false);
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

  // initial load
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
  // initial load END

  // CPU Behavior
  //run createSolution at least once when turn changes
  useEffect(() => {
    if (playerTurn) {
      setSolution([]);
    }
    if (!playerTurn) {
      setSolution([...createSolution()]);
    }
  }, [playerTurn]);

  //play card if there's a valid solution
  //if not, draw a card
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
  //see if there's a solution after card has been drawn
  useEffect(() => {
    if (!playerTurn && p2Pile.length >= 1) {
      setSolution([...createSolution()]);
    }
  }, [p2Pile]);

  //p2 handle playing wild
  useEffect(() => {
    if (p2choose) {
      let suit = chooseSuit();
      setValidCondition({
        value: null,
        suit: suit,
        wild: p1wild.current,
      });
      setp2choose(false);
      setWildTurn(true);
      setPlayerTurn(true);
    }
  }, [p2choose]);

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
    if (playerTurn) {
      dealCards(n, setP1Pile);
    }
  }
  function dealToP2(n = 1) {
    dealCards(n, setP2Pile);
  }
  function newGame() {
    if (discardPile.length > 0) {
      resetGame();
    }
    dealToP1(7);
    dealToP2(7);
    dealToDiscard(1);
    setPlayerTurn(true);
    setActive(true);
  }
  function resetGame() {
    deckRef.current = _.shuffle([
      ...deckRef.current,
      ...discardPile,
      ...p1Pile,
      ...p2Pile,
    ]);
    setWildTurn(false);
    setDiscardPile([]);
    setP1Pile([]);
    setP2Pile([]);
    setActive(false);
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
  function playerPlayCard(player, setFn, key) {
    let card = getCard(key, player);
    let result = validatePlay(card);
    let nextTurn = !playerTurn;
    if (result != FAILED) {
      let cardCount = player.length;
      playCard(key, player, setFn);
      if (wildTurn) {
        setWildTurn(false);
      }
      if (cardCount == 1) {
        if (playerTurn) {
          console.log("p1 Win!");
        } else {
          console.log("p2 Win!");
        }
        setActive(false);
      } else {
        if (result == WILD) {
          console.log("need to hand wild");
          if (playerTurn) {
            setp1choose(true);
          } else {
            setp2choose(true);
          }
        } else {
          setPlayerTurn(nextTurn);

          updateValidCondition(nextTurn, card);
        }
      }
    }
  }
  function p1PlayCard(key) {
    playerPlayCard(p1Pile, setP1Pile, key);
  }
  function p2PlayCard(key) {
    playerPlayCard(p2Pile, setP2Pile, key);
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

  function p1setSuit(suit) {
    setValidCondition({
      value: null,
      suit: suit,
      wild: p2wild.current,
    });
    setp1choose(false);
    setWildTurn(true);
    setPlayerTurn(false);
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
    active,
    p1choose,
    p1setSuit,
    wildTurn,
    validCondition,
  };

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;

  function chooseSuit() {
    let copy = structuredClone(p2Pile);
    let cardsObj = {
      [CLUBS]: { cards: [] },
      [DIAMONDS]: { cards: [] },
      [HEARTS]: { cards: [] },
      [SPADES]: { cards: [] },
    };
    copy = [];
    _.forEach(cardsObj, (n) => {
      copy.push(n.cards);
    });
    copy.sort((a, b) => {
      return b.length - a.length;
    });
    return copy[0][0].suit;
  }

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
