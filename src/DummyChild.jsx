import { useContext } from "react";
import { GameContext } from "./GameProvider";
export function DummyChild() {
  const game = useContext(GameContext);
  return (
    <div>
      <h1>Debug Panel</h1>
      <button onClick={game.resetGame}>Reset</button>
      <button onClick={game.newGame}>New Game</button>
    </div>
  );
}
