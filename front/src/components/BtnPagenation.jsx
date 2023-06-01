import React from 'react'

function BtnPagenation({ currentPage, setCurrentPage, pages }) {

    const priviousPage = () => {
        if (currentPage - 1 === 0) {
            setCurrentPage(1)
            // setDisable(true)
        }
        else {
            setCurrentPage(currentPage - 1)
        }

    }

    return (
        <div> <div>
            <button className='btn btn-primary mx-3 my-2' disabled={currentPage === 1} onClick={() => { setCurrentPage(1) }}> First</button>
            <button className='btn btn-danger mx-3 my-2' disabled={currentPage === 1} onClick={() => { priviousPage() }}> previous</button>
            <button className='btn btn-warning mx-3 my-2' disabled={currentPage === 5} onClick={() => { (currentPage !== pages ? setCurrentPage(currentPage + 1) : setCurrentPage(pages)) }}> Next</button>
            <button className='btn btn-primary mx-3 my-2' disabled={currentPage === 5} onClick={() => { setCurrentPage(pages) }}>Last</button>
        </div>
        </div>
    )
}

export default BtnPagenation