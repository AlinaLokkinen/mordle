

const Cell = ({ value }) => {

    return(
        <div className="border border-gray-300 h-15 w-15 text-white font-bold flex justify-center items-center m-1">
            {value}
        </div>
    )
}

export default Cell;