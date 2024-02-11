import { useContext } from "react";
import { GameContext } from "./GameProvider";

export function Discards() {
  const game = useContext(GameContext);
  const pile = game.discardPile;
  const onClick = () => {
    game.dealToDiscard(7);
  };
  return (
    <div>
      <button onClick={onClick}>Deal one card to Discard</button>
      <div>
        {pile.length > 0 &&
          pile.map((n) => {
            return <img key={n.key + "discard"} src={n.image}></img>;
          })}
      </div>
    </div>
  );
}
