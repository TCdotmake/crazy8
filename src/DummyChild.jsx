import { useContext } from "react";
import { DataContext } from "./DataProvider";
export function DummyChild() {
  const data = useContext(DataContext);
  return <button onClick={data.toggleText}>{data.text}</button>;
}
