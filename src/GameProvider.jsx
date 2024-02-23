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
  const [p2Pile, setP2Pile] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [solution, setSolution] = useState([]);
  const [wildTurn, setWildTurn] = useState(false);
  const [p1choose, setp1choose] = useState(false);
  const [p2choose, setp2choose] = useState(false);
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
  p1wild.current = "8";
  p2wild.current = "8";
  const p2Ref = useRef(null);

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
  // //run createSolution at least once when turn changes
  // useEffect(() => {
  //   if (playerTurn) {
  //     setSolution([]);
  //   }
  //   if (!playerTurn) {
  //     setSolution([...createSolution()]);
  //   }
  // }, [playerTurn]);

  // //play card if there's a valid solution
  // //if not, draw a card
  // useEffect(() => {
  //   console.log(solution);
  //   if (!playerTurn) {
  //     if (solution.length >= 1) {
  //       p2PlayCard(solution[0].key);
  //     } else {
  //       dealToP2(1);
  //     }
  //   }
  // }, [solution]);
  // //see if there's a solution after card has been drawn
  // useEffect(() => {
  //   if (!playerTurn && p2Pile.length >= 1) {
  //     setSolution([...createSolution()]);
  //   }
  // }, [p2Pile]);

  // //p2 handle playing wild
  // useEffect(() => {
  //   if (p2choose) {
  //     console.log("inside p2choose");
  //     let suit = chooseSuit();
  //     console.log("suit: " + suit);
  //     setValidCondition({
  //       value: null,
  //       suit: suit,
  //       wild: p1wild.current,
  //     });
  //     setp2choose(false);
  //     setWildTurn(true);
  //     setPlayerTurn(true);
  //   }
  // }, [p2choose]);

  useEffect(() => {
    if (!playerTurn) {
      p2TurnAction();
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
      //to do
      //handle wild
      //handle change turn
      //handle win condition
      let key = solution[0].key;
      let card = solution[0];
      let nextTurn = !playerTurn;
      let result = validatePlay(card);
      p2PlayCard(key);
      setp2count(p2Ref.current.length);
      if (wildTurn) {
        setWildTurn(false);
      }
      //check for win
      if (p2Ref.current.length == 0) {
        setActive(false);
        console.log("p2 Win!");
      } else {
        if (result == WILD) {
          console.log("entering wild");
          let suit = chooseSuit();
          setValidCondition({
            value: null,
            suit,
            wild: p1wild.current,
          });
          setWildTurn(true);
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

  function p2setFn(drawnCards) {
    updatep2Ref(drawnCards);
    console.log(p2Ref.current);
    setP2Pile((prev) => {
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
  function dealToP2(n = 1) {
    dealCards(n, p2setFn);
  }
  function newGame() {
    let initialCount = 7;
    dealToDiscard();
    dealToP1(initialCount);
    dealp2Ref(initialCount);

    setp2count(initialCount);
    setPlayerTurn(true);
    setActive(true);
    setGameStart(true);
  }
  function resetGame() {
    deckRef.current = _.shuffle([
      ...deckRef.current,
      ...discardPile,
      ...p1Pile,
      ...p2Ref.current,
    ]);
    p2Ref.current = [];
    setWildTurn(false);
    setDiscardPile([]);
    setP1Pile([]);
    setP2Pile([]);
    setActive(false);
    setGameStart(false);
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
    let index = getIndex(key, p2Ref.current);
    if (index != -1) {
      let copy = p2Ref.current;
      let card = copy.splice(index, 1)[0];
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
    setWildTurn(true);
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
    console.log(sorted);
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
      console.log("entering solution loop");
      dealp2Ref(1);
      attempt = createSolution();
    }
    if (attempt.length > 0) {
      console.log("solution");
      console.log(attempt);
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
    gameStart,
    p2Ref,
    p2show,
  };

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}
