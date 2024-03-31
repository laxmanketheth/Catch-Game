import React from 'react'
import './LeaderBoard.scss'
import ScoreBoard from '../ScoreBoard/ScoreBoard'

const LeaderBoard = () => {
  return (
    <div>
      <div className="ParentBox">

        <div className='header'>
          <h1 className='title'>Catcher Game</h1>
        </div>

        <div className='imgContainer'>
          <div className="img">

            <div className='ScoreTitle'>
              <h1>Leader Board</h1>
              <hr />
            </div>

            <ScoreBoard />

          </div>
        </div>

      </div>
    </div>
  )
}

export default LeaderBoard
