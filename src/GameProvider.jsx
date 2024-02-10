import { createContext, useEffect, useRef, useState } from "react";
import { loadDeck } from "./loadDeck";
import { drawCard } from "./drawCardIntoRef";

const p1 = "player1";
const p2 = "player2";
const discards = "discards";

export const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [text, settext] = useState("text1");
  const idRef = useRef(null);
  const drawnCardRef = useRef(null);
  const [deck, setDeck] = useState(null);
  //placeholder for card drawn
  const [loaded, setloaded] = useState(false);
  const [drawnCard, setDrawnCard] = useState(null);
  const cardDestRef = useRef(discards);

  const handleSetDeck = () => {
    loadDeck(setDeck);
  };

  const handleDrawFromDeck = () => {};
  const game = {
    loaded,
    handleDrawFromDeck,
    handleSetDeck,
  };
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}
