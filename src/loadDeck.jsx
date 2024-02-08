async function validate(deck) {
  const url = `https://deckofcardsapi.com/api/deck/${deck}/`;
  let response = await fetch(url);
  let data = await response.json();
  return await data;
}

export async function loadDeck(setDeckId) {
  let deck = localStorage.getItem("deck");
  let data = await validate(deck);
  if (deck === null || !data.success) {
    let response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    let data = await response.json();
    deck = data.deck_id;
    localStorage.setItem("deck", deck);
  }
  setDeckId(deck);
}
