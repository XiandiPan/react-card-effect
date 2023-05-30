import React, { useState, useEffect } from "react";


/**display card
 *
 * props:
 * card
 *
 *  Deck => Card
 *
 */

function Card({card}){

  return (
    <div>
      <img src={card.image} alt={card.code}></img>

    </div>
  )
};

export default Card;