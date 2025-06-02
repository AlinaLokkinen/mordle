

const Cell = ({ value, color }) => {

    return(
        <div className={color === "correct" ? "border border-gray-300 h-15 w-15 text-white font-bold flex justify-center items-center m-1 bg-green-700" : color === "present" ? "border border-gray-300 h-15 w-15 text-white font-bold flex justify-center items-center m-1 bg-yellow-500" : "border border-gray-300 h-15 w-15 text-white font-bold flex justify-center items-center m-1"}>
            {console.log(color)}
            {value}
        </div>
    )
}

export default Cell;