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
  const [gameStart, setGameStart] = useState(false);
  const [active, setActive] = useState(false);
  const [deck, setDeck] = useState(null);
  const [loaded, setloaded] = useState(false);
  const [discardPile, setDiscardPile] = useState([]);
  const [p1Pile, setP1Pile] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [solution, setSolution] = useState([]);

  const [p1choose, setp1choose] = useState(false);
  const [solutionRdy, setSolutionRdy] = useState(false);
  const [p2count, setp2count] = useState(0);
  const [p2show, setp2show] = useState(0);
  // END STATES

  // REFS
  const deckCountRef = useRef(null);
  const deckRef = useRef(null);
  deckCountRef.current = 1;
  const [validCondition, setValidCondition] = useState({});
  const p1wild = useRef(null);
  const p2wild = useRef(null);
  const p2Ref = useRef(null);
  const chosenCard = useRef(null);
  // END REFS

  // useEffect hooks

  // initial load
  useEffect(() => {
    loadDeck(deckCountRef, setDeck);
  }, []);

  useEffect(() => {
    const maxDeg = 50;
    const maxPx = 20;
    if (deck) {
      deckRef.current = [...deck];
      deckRef.current.forEach((n) => {
        n.key = uuid();
        let deg = Math.round(Math.random() * maxDeg - maxDeg / 2);
        let pxx = Math.round(Math.random() * maxPx - maxPx / 2);
        let pxy = Math.round(Math.random() * maxPx - maxPx / 2);
        n.disCss = `rotate: ${deg}deg; transform: translate(${pxx}px, ${pxy}px)`;
      });
      setloaded(true);
    }
  }, [deck]);
  // initial load END

  useEffect(() => {
    if (!playerTurn) {
      setTimeout(() => {
        p2TurnAction();
      }, 700);
    }
  }, [playerTurn]);

  useEffect(() => {
    let diff = 0;
    if (p2count > p2show) {
      diff = 1;
    }
    if (p2count < p2show) {
      diff = -1;
    }
    if (diff != 0) {
      setTimeout(() => {
        setp2show((prev) => {
          return (prev += diff);
        });
      }, 100);
    }
  }, [p2count, p2show]);

  useEffect(() => {
    if (p2count == p2show && solutionRdy) {
      let key = solution[0].key;
      let card = solution[0];
      let nextTurn = !playerTurn;
      let result = validatePlay(card);
      p2PlayCard(key);
      setp2count(p2Ref.current.length);

      //check for win
      if (p2Ref.current.length == 0) {
        setActive(false);
        console.log("p2 Win!");
      } else {
        if (result == WILD) {
          let suit = chooseSuit();
          setValidCondition({
            value: null,
            suit,
            wild: p1wild.current,
          });
        } else {
          updateValidCondition(nextTurn, card);
        }
        setPlayerTurn(true);
      }
      setSolutionRdy(false);
      setSolution([]);
    }
  }, [p2count, p2show, solutionRdy]);

  // END useEffect hooks

  // helper functions

  function updatep2Ref(cards) {
    if (p2Ref.current == null) {
      p2Ref.current = [];
    }
    p2Ref.current = [...p2Ref.current, ...cards];
  }

  function p1setFn(drawnCards) {
    setP1Pile((prev) => {
      return [...prev, ...drawnCards];
    });
  }

  function dealCards(numOfCards, setFn) {
    if (numOfCards > deckRef.current.length) {
      // need to handle shuffling discards back into deck
      shuffleDiscardToDeck();

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
      setFn(drawnCards);
    }
  }

  function shuffleDiscardToDeck() {
    let copy = structuredClone(discardPile);
    let topCard = copy.pop();
    copy = [...copy, ...structuredClone(deckRef.current)];
    copy = _.shuffle(copy);
    setDiscardPile([topCard]);
    deckRef.current = [...copy];
  }

  function dealp2Ref(numOfCards) {
    if (numOfCards > deckRef.current.length) {
      shuffleDiscardToDeck();
      if (numOfCards > deckRef.current.length) {
        return false;
      } else {
        deal();
        return true;
      }
    } else {
      deal();
      return true;
    }

    function deal() {
      let drawnCards = deckRef.current.splice(0, numOfCards);
      updatep2Ref(drawnCards);
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
      dealCards(n, p1setFn);
    }
  }

  function newGame() {
    setTimeout(() => {
      p1wild.current = "8";
      p2wild.current = "8";
      let initialCount = 7;
      dealToDiscard();
      dealToP1(initialCount);
      dealp2Ref(initialCount);
      setp2count(initialCount);
      setPlayerTurn(true);
      setActive(true);
      setGameStart(true);
    }, 300);
  }
  function resetGame() {
    setp2count(0);
    let p1 = structuredClone(p1Pile);
    let dis = structuredClone(discardPile);
    setDiscardPile([]);
    setP1Pile([]);
    deckRef.current = _.shuffle([
      ...deckRef.current,
      ...dis,
      ...p1,
      ...p2Ref.current,
    ]);
    p2Ref.current = [];

    setActive(false);
    setGameStart(false);
    setPlayerTurn(true);
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
  function playCard(card) {
    //get index
    let index = getIndex(card.key, p1Pile);
    if (index != -1) {
      let copy = structuredClone(p1Pile);
      let card = copy.splice(index, 1)[0];
      if (card.value == validCondition.wild) {
        card.wild = true;
      } else {
        card.wild = false;
      }
      setP1Pile([...copy]);
      setDiscardPile((prev) => {
        return [...prev, card];
      });
    }
  }
  function p1PlayCard(key) {
    let card = getCard(key, p1Pile);
    let result = validatePlay(card);
    if (result != FAILED) {
      chosenCard.current = card;
      let cardCount = p1Pile.length;
      if (cardCount == 1) {
        playCard(card);
        console.log("p1 Win!");
        setActive(false);
      } else if (result == WILD) {
        setp1choose(true);
      } else {
        playCard(card);
        setPlayerTurn(false);
        updateValidCondition(false, card);
      }
    }
  }

  function p2PlayCard(key) {
    let index = getIndex(key, p2Ref.current);
    if (index != -1) {
      let copy = p2Ref.current;
      let card = copy.splice(index, 1)[0];
      if (card.value == validCondition.wild) {
        card.wild = true;
      } else {
        card.wild = false;
      }
      setDiscardPile((prev) => {
        return [...prev, card];
      });
    }
  }
  function validatePlay(card) {
    if (card.value == validCondition.wild) {
      return WILD;
    } else if (card.suit == validCondition.suit) {
      return PASSED;
    } else if (card.value == validCondition.value) {
      return PASSED;
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
    playCard(chosenCard.current);
    setPlayerTurn(false);
  }

  function chooseSuit() {
    let copy = structuredClone(p2Ref.current);
    let cardsObj = {
      [CLUBS]: { cards: [] },
      [DIAMONDS]: { cards: [] },
      [HEARTS]: { cards: [] },
      [SPADES]: { cards: [] },
    };
    copy.map((card) => {
      cardsObj[`${card.suit}`].cards.push(card);
    });
    copy = [];
    _.forEach(cardsObj, (n) => {
      copy.push(n.cards);
    });
    copy.sort((a, b) => {
      return b.length - a.length;
    });
    let sorted = [];
    _.forEach(copy, (n) => {
      sorted = [...sorted, ...n];
    });
    return sorted[0].suit;
  }

  function createSolution() {
    let copy = structuredClone(p2Ref.current);
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

  function p2TurnAction() {
    let attempt = createSolution();
    while (attempt.length < 1) {
      dealp2Ref(1);
      attempt = createSolution();
    }
    if (attempt.length > 0) {
      setSolution([...attempt]);
      setSolutionRdy(true);
      setp2count(p2Ref.current.length);
    }
  }

  // Context variables
  const game = {
    loaded,
    deckRef,
    discardPile,
    dealToDiscard,
    p1Pile,
    dealToP1,
    resetGame,
    newGame,
    p1PlayCard,
    playerTurn,
    getCard,
    validatePlay,
    active,
    p1choose,
    p1setSuit,
    validCondition,
    gameStart,
    p2Ref,
    p2show,
  };

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}
