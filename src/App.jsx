import { useEffect, useState } from "react";
import { motion } from "framer-motion";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { loadDeck } from "./loadDeck";

function App() {
  const [deckId, setDeckId] = useState(null);
  useEffect(() => {
    loadDeck(setDeckId);
  }, []);
  useEffect(() => {
    console.log(deckId);
  }, [deckId]);
  return <></>;
}

export default App;
