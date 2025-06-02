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

  const [randomWord, setRandomWord] = useState();

  useEffect(() => {
    const wordOfThePlay = Wordlist[Math.floor(Math.random() * Wordlist.length)];
    setRandomWord(wordOfThePlay.split(""));
  }, []);

  const [currentRow, setCurrentRow] = useState(["", "", "", "", ""]);

  // console.log("randomword", randomWord);
  const [rowTry, setRowTry] = useState(0);
  if (rowTry > 5) {
    console.log("Ei enempää tyhjiä rivejä!");
  }

  console.log(randomWord);

  const handleKeyPress = (key) => {
    if (key === "enter") {
      // jos jokainen solu sisältää kirjaimen, rivi on täysi
      const isNotEmpty = (value) => value !== "";
      if (currentRow.every(isNotEmpty)) {
        // tarkista onko syötetty sana sanalistassa
        if (Wordlist.includes(currentRow.join("").toLowerCase())) {
          // tarkista onko syötetty sana sama kuin randomWord
          if (currentRow.join("").toLowerCase() === randomWord.join("")) {
            const isCorrect = ["", "", "", "", ""];

            for (let i = 0; i < currentRow.length; i++) {
              if (currentRow[i].toLowerCase() === randomWord[i].toLowerCase()) {
                isCorrect[i] = "correct";
              } else if (currentRow[i].toLowerCase() !== randomWord[i].toLowerCase() && randomWord.includes(currentRow[i].toLowerCase())) {
                isCorrect[i] = "present";
              } 
            }

            const newColorGrid = [...colorGrid];

            newColorGrid[rowTry] = isCorrect;

            setColorGrid(newColorGrid);
            
            console.log("Voitto");

            // jos ei, siirrytään seuraavalle riville ja tallennetaan syötetty sana gridiin
          } else {
            console.log("ei voittoa, tarkista kirjainten paikat");

            const isCorrect = ["", "", "", "", ""];

            for (let i = 0; i < currentRow.length; i++) {
              if (currentRow[i].toLowerCase() === randomWord[i].toLowerCase()) {
                isCorrect[i] = "correct";
              } else if (currentRow[i].toLowerCase() !== randomWord[i].toLowerCase() && randomWord.includes(currentRow[i].toLowerCase())) {
                isCorrect[i] = "present";
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
    <div className="bg-black py-15 grid grid-cols-1">
      {/* <h1 className="text-white pb-10 font-bold">Mordle - mock wordle</h1> */}
      <MordleWrapper>
        {grid.map((row, i) => {
          return i === rowTry ? (
            <Row key={i}>
              {currentRow.map((cell, ci) => {
                return <Cell key={ci} value={cell} color={colorGrid[i][ci]}/>;
              })}
            </Row>
          ) : (
            <Row key={i}>
              {row.map((cell, ci) => {
                return <Cell key={ci} value={cell} color={colorGrid[i][ci]}/>;
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
