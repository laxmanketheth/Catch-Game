import React from 'react'
import './GameScreen.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useRef } from 'react';

const GameScreen = () => {

    const [topScore, setTopScore] = useState(0)
    const [leftStyles, setLeftStyles] = useState({ left: '500px' })
    let parsedVal = parseInt(leftStyles.left)
    // console.log(parsedVal);
    let boatImgRef = useRef(null)

//=========== array with image paths ==============//
    const ImgArray = ['/p1.png', '/p2.png', '/p3.png', '/p4.png', '/e1.png', '/e2.png']
    const randomIndex = Math.floor(Math.random() * 6)
    // console.log(randomNum);
    const image = ImgArray[randomIndex]
    // console.log(image);

    //========== this useEffect is for fetching data ==========//

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/')
            const data = await response.json()
            // console.log(data);
            const scoresArray = data.map((item) => item.score)
            // console.log('scoresArray',scoresArray);
            const highestScore = Math.max(...scoresArray);
            // console.log(highestScore);
            setTopScore(highestScore)
        }
        fetchData();
    }, []);
    // console.log(topScore);


    //==========this useEffect is for arrow movement==========//

    useEffect(() => {
        const handleKeyPress = (e) => {

            if (parsedVal > 0 && e.key === 'ArrowLeft') {
                let boatImg = boatImgRef.current
                // console.log('helo', boatImg.style.left);
                let parsedValue = parseInt(boatImg.style.left)
                let newValue = parsedValue - 50 + 'px'
                setLeftStyles({ left: newValue })
            }
            if (parsedVal < 1050 && e.key === 'ArrowRight') {
                let boatImg = boatImgRef.current
                let parsedValue = parseInt(boatImg.style.left)
                // console.log(parsedValue);
                let newValue = parsedValue + 50 + 'px'
                setLeftStyles({ left: newValue })
                // console.log(leftStyles);
            }
        };

        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [leftStyles])


    return (
        <div className='container'>
            <div className='heading'>
                <h1 className='gameHeading'>Catcher Game</h1>
            </div>

            <div className='subContainer'>

                <div className="bgImgContainer">

                    <div className='boatContainer'>

                        {
                            <img src={image} alt="" />
                        }


                        {/* <img
                            style={leftStyles}
                            ref={boatImgRef}
                            className='boatImg'
                            src="/boat.png" 
                            // src ={image5}
                            alt="boat Image" /> */}
                    </div>
                </div>

                <div className="statsContainer">
                    <Link to={'/'}><button className='homebtn'>go home</button></Link>
                    <div className='yourScore'>Your Score
                        <h3>123</h3>
                        <Link to={'/saveScore'}> <button className='homebtn'>Save Score</button></Link>
                    </div>
                    <div className='highestScore'>Highest Score
                        <h3>{topScore}</h3>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default GameScreen;
