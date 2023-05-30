import React, { useState, useEffect } from "react";
import Card from "./Card.js";
import axios from "axios";

const URL = "https://deckofcardsapi.com/api/deck/"

/**Get a deck of card and get card from deck of cards
 *
 * state :
 * deckId
 * cards
 *
 * App => Deck => Card
 *
 */

function Deck(){
  const [deckId, setDeckId] = useState({
    data: null,
    isLoading: true
  });
  const [cards, setCards] = useState([]);

//get card from card API and add it to the current Card array
  async function getCard(){
    const resp = await axios.get(`${URL}/${deckId.data.deck_id}/draw/`);
    setCards((currCards) => [...currCards, resp.data.cards[0]])
  }

// get a deck of card from the card API and set the deckId to the return data,
//and toggle isLoading to False
//when Deck is mounted, invoke the getDeckId, rerender it after we set the deckId
  useEffect(function getDeckIdWhenMounted(){
    async function getDeckId(){
      const resp = await axios.get(`${URL}/new/`);
      setDeckId({
        data: resp.data,
        isLoading: false
      })
    }
    getDeckId()
  },[ ]);

  // if deckId isLoading, show the text Loading...
  if (deckId.isLoading){
    return <div>Loading...</div>
  }

//alert when there is no more card from the deck
//get more card if there is more
  function handleClick(e){
    e.preventDefault();
    if (cards.length >= 52){
    alert('no more cards from the deck')
    return;
    }
      getCard();
  }

  return (

    <div>
      <button onClick={handleClick}>Give me a Card</button>
      {cards.length > 0 &&  <Card card={cards[cards.length-1]}/>}


    </div>
  )

}

export default Deck