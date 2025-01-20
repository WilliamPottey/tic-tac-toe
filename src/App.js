import logo from "./logo.svg";
import { useState, useRef } from "react";
import "./App.css";
import GameBoard from "./GameBoard";

function App() {
  const [Player1, setPlayer1] = useState("");
  const [Player2, setPlayer2] = useState("");
  const [Start, setStart] = useState(false);

  const startGame = () => {
    if (Player1.length === 0 || Player2.length === 0) {
      return;
    }
    setStart(true);
  };

  const resetGame = () => {
    setStart(false);
    setPlayer1("");
    setPlayer2("");
  };

  return (
    <>
      <h1> Tic-Tac-Toe</h1>
      <form>
        <label>Player 1 </label>{" "}
        <input
          className={Start === true ? "inputGray" : null}
          type="text"
          value={Player1}
          onChange={(e) => setPlayer1(e.target.value)}
          readOnly={Start === true ? true : false}
        ></input>{" "}
        <br />
        <label>Player 2 </label>{" "}
        <input
          className={Start === true ? "inputGray" : null}
          type="text"
          value={Player2}
          onChange={(e) => setPlayer2(e.target.value)}
          readOnly={Start === true ? true : false}
        ></input>{" "}
        <br />
      </form>
      <button className="button-1" onClick={() => startGame()}>
        {" "}
        Start{" "}
      </button>
      <button className="button-2" onClick={() => resetGame()}>
        {" "}
        Reset{" "}
      </button>
      {Start === true ? (
        <GameBoard
          name1={{ name: Player1, character: "X" }}
          name2={{ name: Player2, character: "O" }}
        />
      ) : null}
    </>
  );
}

export default App;
