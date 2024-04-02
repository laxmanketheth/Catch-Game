import React from 'react'
import './ScoreSubmitBox.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

const ScoreSubmitBox = () => {

    const score = useSelector(state => state.score.score);
    const [inputData, setInputData] = useState('');
    // console.log('input val',inputData);
    const [playerData, setPlayerData] = useState({})
    // console.log(playerData);
    // let base_url = 'https://catch-game-backend.vercel.app'
    let base_url = 'http://localhost:8080'

    const handleChange = (e) => {
        const value = e.target.value
        setInputData(value)
    };

    const handleSubmit = () => {
        //using if statement will help in updating playerData only if the input field is populated //
        if (inputData) {
            setPlayerData({
                playerName: inputData,
                score: score
            });
        };
        //setting input data using setInputData to empty string will
        // make the input field empty once the submit button is clicked//
        setInputData('')
    };

    // =============== saving to database ========= //
    useEffect(() => {
        fetch(base_url + '/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerData)
        })
    });

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

                            <input
                                type="text"
                                placeholder='Enter Your Name'
                                onChange={handleChange}
                                value={inputData}
                                id=""
                            />

                            <button onClick={handleSubmit}>
                                Save
                            </button>
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
