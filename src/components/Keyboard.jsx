import { useState } from "react";

const Keyboard = ({onKeyPress}) => {

    const [keyboard,] = useState([
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "bs"],
  ]);

  return (
    <div className="pt-5">
      {keyboard.map((row, i) => 
        <div key={i}>
            {row.map((key, ki) => {
                return <button 
                key={ki}
                className={key === "enter" || key === "bs" ? "text-white bg-zinc-500 w-15 h-13 m-1 rounded" : "text-white bg-zinc-500 w-10 h-13 m-1 rounded"}
                onClick={() => onKeyPress(key)}
                >{key.toUpperCase()}</button>
            })}
        </div>
      )}

    
    </div>
  );
};

export default Keyboard;
