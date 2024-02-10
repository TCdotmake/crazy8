import { useContext } from "react";
import { GameContext } from "./GameProvider";
export function DummyChild() {
  const data = useContext(GameContext);
  return <button>{data.loaded ? "true" : "false"}</button>;
}
