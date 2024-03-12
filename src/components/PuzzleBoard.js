import React from "react";

export const PuzzleBoard = ({
  storyCards,
  handlonDragEnd,
  handleonDragStart,
  handleOnDragEnter,
}) => {
  if (storyCards.length === 0) {
    return (
      <div className="initial-text">
        <h2>Drag and Drop below cards here..</h2>
      </div>
    );
  }
  return (
    <div className="card-Item">
      {storyCards.map((storyCard, index) => {
        return (
          <div
            draggable
            onDragStart={() => handleonDragStart(index)}
            onDragEnter={() => handleOnDragEnter(index)}
            onDragEnd={handlonDragEnd}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="item">
              <img src={storyCard?.image}></img>
            </div>
          </div>
        );
      })}
    </div>
  );
};
