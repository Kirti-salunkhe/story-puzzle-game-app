import React from 'react'

export const CardBoard = ({availableCards,handleOnDrag}) => {
  return (
    <>
          {availableCards.map((card) => {
            return (
              <div  draggable onDragStart={(e) => handleOnDrag(e, card?.id)}>
                <div className='item'>
                  <img src={card?.image}></img>
                  <div className='overlay'>
                    <h3>{card.description}</h3>
                  </div>
                </div>
                
              </div>
            );
          })}
    </>
  )
}
