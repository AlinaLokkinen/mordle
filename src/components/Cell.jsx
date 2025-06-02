

const Cell = ({ value, color }) => {

    return(
        <div className={color === "correct" ? "border border-green-700 h-15 w-15 text-white font-bold flex justify-center items-center m-1 bg-green-700" : color === "present" ? "border border-yellow-500 h-15 w-15 text-white font-bold flex justify-center items-center m-1 bg-yellow-500" : color === "not in word" ? "border border-zinc-700 h-15 w-15 text-white font-bold flex justify-center items-center m-1 bg-zinc-700" : "border border-gray-300 h-15 w-15 text-white font-bold flex justify-center items-center m-1"}>
            {value}
        </div>
    )
}

export default Cell;