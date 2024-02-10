import { createContext, useEffect, useRef, useState } from "react";
import { loadDeck } from "./loadDeck";

const p1 = "player1";
const p2 = "player2";
const discards = "discards";

export const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [deck, setDeck] = useState(null);
  const [loaded, setloaded] = useState(false);
  const [discardPile, setDiscardPile] = useState([]);
  const [p1Pile, setP1Pile] = useState([]);
  const [p2Pile, setP2Pile] = useState([]);
  const deckCountRef = useRef(null);
  const deckRef = useRef(null);
  deckCountRef.current = 1;

  useEffect(() => {
    loadDeck(deckCountRef, setDeck);
  }, []);

  useEffect(() => {
    if (deck) {
      setloaded(true);
      deckRef.current = [...deck];
    }
  }, [deck]);

  const handleDrawFromDeck = () => {};
  const game = {
    loaded,
  };
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}
