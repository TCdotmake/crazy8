import { createContext, useEffect, useRef, useState } from "react";
import { loadDeck } from "./loadDeck";

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [text, settext] = useState("text1");
  const idRef = useRef(null);
  useEffect(() => {
    loadDeck(idRef);
  }, []);
  useEffect(() => {
    console.log(idRef.current);
  }, [idRef.current]);

  const toggleText = () => {
    console.log(idRef.current);
    settext((prev) => {
      prev = prev === "text1" ? "text2" : "text1";
      return prev;
    });
  };
  const data = {
    text,
    toggleText,
  };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
