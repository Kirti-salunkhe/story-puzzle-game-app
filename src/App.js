import React, { useRef, useState } from "react";
import { story_puzzle } from "./data.js";
import { CardBoard } from "./components/CardBoard.js";
import { PuzzleBoard } from "./components/PuzzleBoard.js";
import ResultModal from "./components/ResultModal.js";
import video from "./assets/game.mp4";

function shuffleArray() {
  let tempArray = [...story_puzzle];
  for (let i = tempArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  return tempArray;
}
const timer = 20;
export const App = () => {
  const [storyCards, setStoryCards] = useState([]);
  const [availableCards, setAvailableCards] = useState(shuffleArray());

  // const [timerStart, setTimerStart] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timer * 1000);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState();
  const dragCard = useRef();
  const dragOverCard = useRef();
  let time = useRef();
  let modal = useRef();

  const handleOnDrag = (e, cardId) => {
    e.dataTransfer.setData("cardId", cardId);
  };

  const handleonDragStart = (cardId) => {
    dragCard.current = cardId;
  };

  const handleOnDragEnter = (cardId) => {
    dragOverCard.current = cardId;
  };

  const handlonDragEnd = () => {
    let tempCardItems = [...storyCards];
    let temp = tempCardItems[dragCard.current];
    tempCardItems[dragCard.current] = tempCardItems[dragOverCard.current];
    tempCardItems[dragOverCard.current] = temp;
    setStoryCards([...tempCardItems]);
  };

  const handleOnDrop = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    const cardItem = availableCards.find((card) => card?.id == cardId);

    if (cardItem) {
      setStoryCards([...storyCards, cardItem]);
      let remainingCards = availableCards.filter((card) => card?.id != cardId);
      setAvailableCards([...remainingCards]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const calculateResult = () => {
    let idsArr = storyCards.map((card) => card.id);
    return (
      storyCards.length === story_puzzle.length &&
      idsArr.every(
        (val, index, array) => index === 0 || val >= array[index - 1]
      )
    );
  };
  let timerStart = timeRemaining > 0 && timeRemaining < timer * 1000;
  console.log(timeRemaining, timerStart);
  if (timeRemaining <= 0) {
    console.log("hi");
    clearInterval(time.current);
    setTimeRemaining(timer * 1000);
    modal.current.showModal();
  }
  const onHandleStart = () => {
    time.current = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 10);
      setProgress((prev) => prev + 10);
    }, 10);
  };

  const onHandleFinish = () => {
    clearInterval(time.current);
    setTimeRemaining(timer * 1000);
    modal.current.showModal();
  };

  const handleOnClose = () => {
    setStoryCards([]);
    setAvailableCards(shuffleArray());
  };
  return (
    <>
      <ResultModal
        ref={modal}
        result={calculateResult}
        OnClose={handleOnClose}
      />
      <main className="container">
        <header>
          <div>
            <button
              className="button"
              onClick={timerStart ? onHandleFinish : onHandleStart}
            >
              {timerStart ? "Finish" : "Start"}
            </button>
          </div>
        </header>
       { (timerStart)&&<div className="timer">
          <p>{`Remaining Time : ${timeRemaining / 1000}s`}</p>
        </div>}

        {!timerStart && (
          <video id="video" autoPlay muted loop>
            <source src={video} type="video/mp4" />
          </video>
        )}
        {timerStart && (
          <div
            className="card-board"
            onDrop={handleOnDrop}
            onDragOver={handleDragOver}
          >
            <PuzzleBoard
              storyCards={storyCards}
              handlonDragEnd={handlonDragEnd}
              handleonDragStart={handleonDragStart}
              handleOnDragEnter={handleOnDragEnter}
            />
          </div>
        )}
        {timerStart && (
          <div className="story-board">
            <CardBoard
              availableCards={availableCards}
              handleOnDrag={handleOnDrag}
            />
          </div>
        )}
      </main>
    </>
  );
};
