import { useContext } from "react";
import { GameContext } from "./GameProvider";
export function Top() {
  const game = useContext(GameContext);
  return (
    <div>
      <button onClick={game.active ? game.resetGame : game.newGame}>
        {game.active ? "Reset" : "New Game"}
      </button>
      <p>{`CPU X ${game.p2Pile.length}`}</p>
    </div>
  );
}
