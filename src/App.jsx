import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card'
import { MoveLeft, MoveRight } from 'lucide-react';

const App = () => {
  const [userData, setUserData] = useState([])// [] why ? - API multiple images degi.
  const [index, setIndex] = useState(1) // store page index 

  const totalPages = 30

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=20`
      )

      const shuffledData = [...response.data].sort( // use for random order
        () => Math.random() - 0.5 // Subtracting 0.5 makes values:- Negative sometimes Positive sometimes which creates randomness.
      )

      setUserData(shuffledData) //userData = shuffledData
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [index]) // if index change useeffect run again:  for 1 index - page 1 data comes.
// Index changed 1 → 2 getData() run again: New image appear of page 2

// add pagination
  const getPageNumbers = () => {
    if (index <= 3) { // if current page is 1, 2 ,3 always show - 1 2 3 4 5 page buttons on screen
      return [1, 2, 3, 4, 5]
    }

    if (index >= totalPages - 2) { // for page - > 28,29 30  eg-index = 28 , totalpages = 30 
      return [
        totalPages - 4, // 26
        totalPages - 3, // 27
        totalPages - 2, // 28
        totalPages - 1, // 29
        totalPages, //30
      ]
    } // we lock the last 5 pages.

    return [ //This runs for middle pages.
      index - 2,
      index - 1,
      index,
      index + 1,
      index + 2,
    ]
  } // eg- for index = 10 it show on screen 8,9,10,11,12

  return (
    <div className="bg-black min-h-screen text-white p-6">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold">
          Image Gallery
        </h1>

        <p className="text-zinc-400 mt-3">
          Browse stunning photos
        </p>
      </div>

      {/* Loading */}
      {userData.length === 0 ? ( // show loading
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-14 h-14 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* else Show Gallery */}
          <div className="flex flex-wrap justify-center gap-5">
            {userData.map((elem) => (
              <Card key={elem.id} elem={elem} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">

            {/* Prev */} 
            <button
              disabled={index === 1}
              onClick={() => {
                setUserData([])
                setIndex(index - 1)
              }} //Click Prev: Data Empty ->Loading Show -> New API Call-> New Images
              className="w-10 h-10 rounded-md bg-zinc-900 border border-zinc-700 hover:border-amber-400 disabled:opacity-40"
            >
              <MoveLeft />
            </button>

            {/* First Page */}
            {index > 3 && (
              <>
                <button
                  onClick={() => {
                    setUserData([])
                    setIndex(1)
                  }}
                  className="w-10 h-10 rounded-md bg-zinc-900 border border-zinc-700"
                >
                  1
                </button>

                <span className="text-zinc-500">
                  ...
                </span>
              </>
            )}

            {/* Dynamic Pages */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => {
                  setUserData([])
                  setIndex(page)
                }}
                className={`w-10 h-10 rounded-md border transition-all duration-300
                ${
                  index === page
                    ? 'bg-amber-400 text-black font-bold border-amber-400' /* active style - current page highlight */
                    : 'bg-zinc-900 border-zinc-700 hover:border-amber-400'  /* else normal style*/
                }
                `}
              >
                {page}
              </button>
            ))}

            {/* Last Page eg- 10 < 28 then it show on screen 1 ... 8 9 10 11 12 ... 30 */}
            {index < totalPages - 2 && (
              <>
                <span className="text-zinc-500">
                  ...
                </span> 

                <button
                  onClick={() => {
                    setUserData([])
                    setIndex(totalPages)
                  }}
                  className="w-10 h-10 rounded-md bg-zinc-900 border border-zinc-700"
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* Next */}
            <button
              disabled={index === totalPages}
              onClick={() => {
                setUserData([])
                setIndex(index + 1)
              }}
              className="w-10 h-10 rounded-md bg-zinc-900 border border-zinc-700 hover:border-amber-400 disabled:opacity-40"
            >
           <MoveRight />
            </button>

          </div>
        </>
      )}
    </div>
  )
}

export default App
