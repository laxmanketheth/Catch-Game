import React, {useState, useEffect } from 'react'
import './ScoreBoard.scss'
// import { data } from '../../fakeData'
import { Link } from 'react-router-dom'

const ScoreBoard = () => {
    const [gameData, setGameData] = useState([]);
    let base_url = 'https://catch-game-backend.vercel.app'

    useEffect(() => {
        const fetchData = async () => {
            const response  = await fetch(base_url + '/')
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
