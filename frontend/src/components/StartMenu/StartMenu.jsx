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
                        {/* need to fix the css of buttons because i have changed the <a> tags to buttons now because of error that i should not put <a> tag inside Link tag */}
                       <Link to={'/startgame'}> <button className='btn'>Start Game</button></Link>
                       <Link to={'/leaderboard'}> <button className='btn'>Leader Board</button></Link>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default StartMenu
