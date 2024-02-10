export async function drawCard(deckId, setDeck) {
  let url = `https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`;
  let response = await fetch(url);
  let data = await response.json();
  setDeck([...data.cards]);
}
