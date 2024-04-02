import React from 'react'
import './StartMenu.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initialiseStates } from '../../store/scoreSlice'

const StartMenu = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(initialiseStates())
    };

    return (
        <div className='container'>
            <div className='heading'>
                <h1 className='gameTitle'>Catch Fever</h1>
            </div>

            <div className='subContainer'>

                <div className="bgImgContainer">
                    <div className="buttonsContainer">
                        {/* need to fix the css of buttons because i have changed the <a> tags to buttons now because of error that i should not put <a> tag inside Link tag */} 
                       <Link to={'/startgame'}> <button onClick={handleClick} className='btn'>Start Game</button></Link>
                       <Link to={'/leaderboard'}> <button className='btn'>Leader Board</button></Link>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default StartMenu
