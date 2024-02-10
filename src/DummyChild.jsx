import { useContext } from "react";
import { GameContext } from "./GameProvider";
export function DummyChild() {
  const data = useContext(GameContext);
  return <button onClick={data.handleSetDeck}>setDeck</button>;
}
