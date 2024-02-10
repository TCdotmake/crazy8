async function validate(deck) {
  const url = `https://deckofcardsapi.com/api/deck/${deck}/`;
  let response = await fetch(url);
  let data = await response.json();
  return await data;
}

async function shuffleDeck(deckId) {
  let url = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;
  let response = await fetch(url);
  let data = await response.json();
  return data.success;
}

async function createDeck(deckId, setDeck) {
  let url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`;
  console.log(url);
  let response = await fetch(url);
  let data = await response.json();
  setDeck([...data.cards]);
  console.log("setdeck has been called");
}

export async function loadDeck(setDeck) {
  let deckId = localStorage.getItem("deck");
  let data = await validate(deckId);
  if (deckId === null || !data.success) {
    let response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    let data = await response.json();
    deckId = data.deck_id;
    localStorage.setItem("deck", deckId);
  }
  //shuffle deck
  let ready = shuffleDeck(deckId);
  if (ready) {
    createDeck(deckId, setDeck);
  }
}
