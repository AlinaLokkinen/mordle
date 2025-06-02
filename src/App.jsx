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

  const [randomWord, setRandomWord] = useState();

  useEffect(() => {
    const wordOfThePlay = Wordlist[Math.floor(Math.random() * Wordlist.length)];
    setRandomWord(wordOfThePlay.split(""));
  }, []);

  const [currentRow, setCurrentRow] = useState(["", "", "", "", ""]);

  console.log("randomword", randomWord);
  const [rowTry, setRowTry] = useState(0);

  const handleKeyPress = (key) => {
    if (key === "enter") {
      // jos jokainen solu sisältää kirjaimen, rivi on täysi
      const isNotEmpty = (value) => value !== "";
      if (currentRow.every(isNotEmpty)) {
        if (Wordlist.includes(currentRow.join("").toLowerCase())) {
          if (currentRow.join("").toLowerCase() === randomWord.join("")) {
            console.log("Voitto");
          } else {
            console.log("ei voittoa, tarkista kirjainten paikat");

            const newGrid = [...grid];

            newGrid[rowTry] = currentRow;

            setGrid(newGrid);

            let rows = rowTry;
            rows = rows + 1;
            setRowTry(rows);

            const emptyRow = ["", "", "", "", ""];
            setCurrentRow(emptyRow);
            // lisää rowTry + 1
            // tyhjennä currentRow
          }
        } else {
          // kerro käyttäjälle "Not in worlist"
          console.log("ei löydy");
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
      const nextIndex = currentRow.findIndex((c) => c === "");
      if (nextIndex === -1) return; // rivi täynnä
      const newRow = [...currentRow];
      newRow[nextIndex] = key.toUpperCase();
      setCurrentRow(newRow);
    }
  };

  return (
    <div className="bg-black py-15 grid grid-cols-1">
      {/* <h1 className="text-white pb-10 font-bold">Mordle - mock wordle</h1> */}
      <MordleWrapper>
        {grid.map((row, i) => {
          return i === rowTry ? (
            <Row key={i}>
              {currentRow.map((cell, ci) => {
                return <Cell key={ci} value={cell} />;
              })}
            </Row>
          ) : (
            <Row key={i}>
              {row.map((cell, ci) => {
                return <Cell key={ci} value={cell} />;
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
