import "./App.css";
import MordleWrapper from "./components/MordleWrapper";
import Row from "./components/Row";
import Cell from "./components/Cell";
import { useEffect, useState } from "react";
import Keyboard from "./components/Keyboard";
import Wordlist from "./components/wordlist";

function App() {
  const [grid, setGrid] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [colorGrid, setColorGrid] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  console.log(colorGrid);

  const [randomWord, setRandomWord] = useState();

  const [outOfTriesMsg] = useState(`Out of tries! The word was`);
  const [gameWonMsg] = useState("Word guessed!");
  const [wordNotFoundMsg] = useState("Not in wordlist!");
  const [gameWon, setGameWon] = useState(false);
  const [showWordNotFoundMsg, setShowWordNotFoundMsg] = useState(false);

  const [currentRow, setCurrentRow] = useState(["", "", "", "", ""]);
  const [rowTry, setRowTry] = useState(0);

  useEffect(() => {
    const wordOfThePlay = Wordlist[Math.floor(Math.random() * Wordlist.length)];
    setRandomWord(wordOfThePlay.split(""));
  }, []);

  const handleRefresh = () => {
    window.location.reload(false);
  };

  const handleKeyPress = (key) => {
    setShowWordNotFoundMsg(false);
    if (key === "enter") {
      // jos jokainen solu sisältää kirjaimen, rivi on täysi
      const isNotEmpty = (value) => value !== "";
      if (currentRow.every(isNotEmpty)) {
        // tarkista onko syötetty sana sanalistassa
        if (Wordlist.includes(currentRow.join("").toLowerCase())) {
          // tarkista onko syötetty sana sama kuin randomWord
          //
          if (currentRow.join("").toLowerCase() === randomWord.join("")) {
            // muutetaan solut vihreiksi
            const isCorrect = ["", "", "", "", ""];

            for (let i = 0; i < currentRow.length; i++) {
              if (currentRow[i].toLowerCase() === randomWord[i].toLowerCase()) {
                isCorrect[i] = "correct";
              } else if (
                currentRow[i].toLowerCase() !== randomWord[i].toLowerCase() &&
                randomWord.includes(currentRow[i].toLowerCase())
              ) {
                isCorrect[i] = "present";
              } else {
                isCorrect[i] = "not in word";
              }
            }

            const newColorGrid = [...colorGrid];
            newColorGrid[rowTry] = isCorrect;
            setColorGrid(newColorGrid);

            // annetaan tieto voitosta
            setGameWon(true);

            // jos ei, siirrytään seuraavalle riville ja tallennetaan syötetty sana gridiin
          } else {
            const isCorrect = ["", "", "", "", ""];

            for (let i = 0; i < currentRow.length; i++) {
              if (currentRow[i].toLowerCase() === randomWord[i].toLowerCase()) {
                isCorrect[i] = "correct";
              } else if (
                currentRow[i].toLowerCase() !== randomWord[i].toLowerCase() &&
                randomWord.includes(currentRow[i].toLowerCase())
              ) {
                isCorrect[i] = "present";
              } else {
                isCorrect[i] = "not in word";
              }
            }

            const newColorGrid = [...colorGrid];
            newColorGrid[rowTry] = isCorrect;
            setColorGrid(newColorGrid);
            const newGrid = [...grid];
            newGrid[rowTry] = currentRow;
            setGrid(newGrid);

            // siirrytään seuraavalle riville jos vielä tilaa

            let rows = rowTry;
            rows = rows + 1;
            setRowTry(rows);
            const emptyRow = ["", "", "", "", ""];
            setCurrentRow(emptyRow);
          }
        } else {
          // kerro käyttäjälle "Not in wordlist"
          setShowWordNotFoundMsg(true);
        }
      }
      // jos ei, tarkista mitkä kirjaimet ovat oikein ja ovatko oikeilla vai väärillä paikoilla
      // tyhjennä currentRow ja lisää rowTry +1
      return;
    } else if (key === "bs") {
      const letterIndexes = [];
      for (let i = 0; i < currentRow.length; i++) {
        if (currentRow[i] !== "") {
          letterIndexes.push(i);
        }
      }
      const lastIndex = Math.max(...letterIndexes);
      const newRow = [...currentRow];
      newRow[lastIndex] = "";
      setCurrentRow(newRow);
      return;
    } else {
      if (rowTry <= 5) {
        const nextIndex = currentRow.findIndex((c) => c === "");
        if (nextIndex === -1) return; // rivi täynnä
        const newRow = [...currentRow];
        newRow[nextIndex] = key.toUpperCase();
        setCurrentRow(newRow);
      }
    }
  };

  return (
    <div className="bg-black py-10">
      <h1 className="text-white font-bold">Mordle - mock wordle</h1>
      <MordleWrapper>
        {gameWon && (
          <div>
            <p className="text-white">{gameWonMsg}</p>
            <button className="text-white mb-3" onClick={handleRefresh}>
              Play again
            </button>
          </div>
        )}
        {showWordNotFoundMsg && (
          <p className="text-white pb-5">{wordNotFoundMsg}</p>
        )}
        {rowTry > 5 && (
          <div>
            <p className="text-white">{outOfTriesMsg} </p>
            <button className="text-white mb-3" onClick={handleRefresh}>
              Play again
            </button>
          </div>
        )}
        {grid.map((row, i) => {
          return i === rowTry ? (
            <Row key={i}>
              {currentRow.map((cell, ci) => {
                return <Cell key={ci} value={cell} color={colorGrid[i][ci]} />;
              })}
            </Row>
          ) : (
            <Row key={i}>
              {row.map((cell, ci) => {
                return <Cell key={ci} value={cell} color={colorGrid[i][ci]} />;
              })}
            </Row>
          );
        })}
      </MordleWrapper>
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;
