import React from 'react'
import './ScoreSubmitbox.scss'

const ScoreSubmitBox = () => {
    return (
        <div className='mostOuterContainer'>

            <div className='outerMostContainer'>

                <div className='parentContainer' >
                    {/* <div className="subContainer"> */}
                    <div className='boxTitle'>
                        <h1>Save Your Score</h1>
                    </div>

                    <div className='infoContainer'>
                        <div className='scoreContainer'>
                            <h2>Your Score</h2>
                            <p>1234</p>
                            <input type="text" placeholder='Enter Your Name' name="" id="" />
                            <button>Save</button>
                        </div>

                    </div>

                    {/* </div> */}
                </div>
            </div>

        </div>
    )
}

export default ScoreSubmitBox
