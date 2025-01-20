import { useState, useEffect } from "react";
import "./GameBoard.css";

function GameBoard(props) {
  const [Turn, setTurn] = useState(props.name1);
  const [winner, setWinner] = useState([]);
  const [boxes, setBoxes] = useState([
    { num: 0, value: "" },
    { num: 1, value: "" },
    { num: 2, value: "" },
    { num: 3, value: "" },
    { num: 4, value: "" },
    { num: 5, value: "" },
    { num: 6, value: "" },
    { num: 7, value: "" },
    { num: 8, value: "" },
  ]);

  let winConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  // checks win condition after each turn
  useEffect(() => {
    if (Turn.character === "O") {
      checkWinCondition("X");
    } else {
      checkWinCondition("O");
    }
  }, [Turn]);

  const checkWinCondition = (player) => {
    let newArray = boxes.filter((value) => value.value === player);
    if (newArray.length < 3) {
      return false;
    }
    let nums = newArray.map((item) => item.num);
    for (let i = 0; i < winConditions.length; i++) {
      if (checkSubArray(nums, winConditions[i])) {
        if (Turn.character === "O") {
          setTurn(props.name1);
        } else {
          setTurn(props.name2);
        }
        return true;
      }
    }
    if (nums.length === 5) {
      setWinner(["tie"]);
    }
    return false;
  };

  const checkSubArray = (mainArray, subArray) => {
    for (let i = 0; i < subArray.length; i++) {
      if (!mainArray.includes(subArray[i])) {
        return false;
      }
    }
    setWinner(subArray);
    return true;
  };

  const clickBox = (index) => {
    if (winner.length === 3) {
      return;
    }
    if (boxes[index].value) {
      return;
    }
    if (Turn.character === "X") {
      setBoxes(
        boxes.map((item, i) => (index === i ? { ...item, value: "X" } : item))
      );
      setTurn(props.name2);
    } else if (Turn.character === "O") {
      setBoxes(
        boxes.map((item, i) => (index === i ? { ...item, value: "O" } : item))
      );
      setTurn(props.name1);
    }
  };

  const startOver = () => {
    setTurn(props.name1);
    setBoxes([
      { num: 0, value: "" },
      { num: 1, value: "" },
      { num: 2, value: "" },
      { num: 3, value: "" },
      { num: 4, value: "" },
      { num: 5, value: "" },
      { num: 6, value: "" },
      { num: 7, value: "" },
      { num: 8, value: "" },
    ]);
    setWinner([]);
  };

  return (
    <>
      <div>
        <span className="playerTurn">
          {winner.length < 3 && winner[0] !== "tie" ? (
            <span>
              it is {<span style={{ fontWeight: "bold" }}>{Turn.name}'s </span>}
              turn!
            </span>
          ) : winner[0] === "tie" ? (
            <span className="game-over-text">The game has ended in a Tie!</span>
          ) : (
            <span className="game-over-text"> {Turn.name} Wins!</span>
          )}
        </span>
        <span className="playerTurn">
          {winner.length < 3 && winner[0] !== "tie" ? (
            <span>
              You are player{" "}
              {<span style={{ fontWeight: "bold" }}>{Turn.character}</span>}
            </span>
          ) : (
            <button className="button-no-margin" onClick={() => startOver()}>
              Play Again
            </button>
          )}
        </span>
        <br />
      </div>
      <div className="box-container">
        {boxes.map((box, index) => (
          <div
            key={index}
            className={
              winner.includes(index)
                ? "box box-winner"
                : box.value || winner.length === 3
                ? "box"
                : Turn.character === "X"
                ? "box box-hover-X"
                : "box box-hover-O"
            }
            onClick={() => clickBox(index)}
          >
            <span className={box.value === "X" ? "character-X" : "character-O"}>
              {box.value}
            </span>
          </div>
        ))}
      </div>
      <br />
    </>
  );
}

export default GameBoard;
