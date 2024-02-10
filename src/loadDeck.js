export async function loadDeck(deckCountRef, setDeck) {
  let url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCountRef.current}`;
  let response = await fetch(url);
  let data = await response.json();
  let id = await data.deck_id;
  url = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${
    deckCountRef.current * 52
  }`;
  response = await fetch(url);
  data = await response.json();
  setDeck([...(await data.cards)]);
}
