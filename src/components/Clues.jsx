import React from 'react'

function Clues({ game }) {
    return (
        <div className='flex flex-wrap gap-5 justify-between p-5'>
            {game.clues.map((clue => (
                <div className='w-[30%] p-3 bg-gray-200 border' key={clue.id}>
                    <p><b>Başlık:</b> {clue.title}</p>
                    <p><b>İçeriği:</b> {clue.content}</p>
                </div>
            )))}
        </div>
    )
}

export default Clues