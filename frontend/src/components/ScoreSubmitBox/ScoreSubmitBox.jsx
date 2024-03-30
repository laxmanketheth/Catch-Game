import React from 'react'
import './ScoreSubmitbox.scss'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

const ScoreSubmitBox = () => {

    const score = useSelector(state => state.score)
    // console.log('score in submit box',score);

    return (
        <div className='mostOuterContainer'>

            <div className='outerMostContainer'>

                <div className='parentContainer' >
                    {/* <div className="subContainer"> */}
                    <div className='boxTitle'>
                        <h1>Game Over</h1>
                    </div>

                    <div className='infoContainer'>
                        <div className='scoreContainer'>
                            <h2>Your Score</h2>
                            <p>{score}</p>
                            <input type="text" placeholder='Enter Your Name' name="" id="" />
                            <button>Save</button>
                           <Link to={'/'}> <button className='goHomeBtn'>go home</button></Link>
                        </div>

                    </div>

                    {/* </div> */}
                </div>
            </div>

        </div>
    )
}

export default ScoreSubmitBox
