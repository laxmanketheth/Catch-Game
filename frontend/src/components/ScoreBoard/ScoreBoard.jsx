import React, {useState, useEffect } from 'react'
import './ScoreBoard.scss'
// import { data } from '../../fakeData'
import { Link } from 'react-router-dom'

const ScoreBoard = () => {
    const [gameData, setGameData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response  = await fetch('http://localhost:8080/')
            const data = await response.json()
            // console.log(result);
            const sortedData = data.sort((a,b)=>b.score - a.score)
            setGameData(sortedData)
        }
        fetchData();
    }, []);

    // console.log('gamedata',gameData);

    return (
        <div>
            <div className="scoreBoardContainer">

                <div className='scoreBoard' >
                    <div className='topPlayerTitle'>
                        <h1>Top Best players</h1>
                        <Link to={'/'}>
                            <button className='gohomeBtn'>go home</button>
                        </Link>
                    </div>

                    <div className='playerDataTitle'>
                        <div>Rank</div>
                        <div>Player Name</div>
                        <div>Score</div>
                    </div>

                    {gameData.map((person,index) => {
                        return (
                            // <>
                                <div key={person._id} className='playerData' >
                                    <div>{index+1}</div>
                                    <div>{person.playerName}</div>
                                    <div>{person.score}</div>
                                </div>
                            // </>
                        )
                    })
                    }
                </div>

            </div>
        </div>
    )
}

export default ScoreBoard
