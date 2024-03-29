import React from 'react'
import './StartMenu.scss'
import { Link } from 'react-router-dom'

const StartMenu = () => {
    return (
        <div className='container'>
            <div className='heading'>
                <h1 className='gameTitle'>Catcher Game</h1>
            </div>

            <div className='subContainer'>

                <div className="bgImgContainer">
                    <div className="buttonsContainer">
                       <Link to={'/startgame'}> <a className='btn'>Start Game</a></Link>
                       <Link to={'/leaderboard'}> <a className='btn'>Leader Board</a></Link>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default StartMenu
