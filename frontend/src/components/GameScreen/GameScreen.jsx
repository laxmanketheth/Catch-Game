import React from 'react'
import './GameScreen.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useRef } from 'react';

const GameScreen = () => {

    // const [score, setScore] = useState(0);

    const [randomImgStyle, setRandomImgStyle] = useState({ bottom: '520px' });
    // const [boatImgHeight, setBoatImgHeight] = useState({height: '120px'})
    // console.log(randomImgStyle);
    // console.log(boatImgHeight);

    const [randomImage, setRandomImage] = useState('');
    const [topScore, setTopScore] = useState(0);
    const [leftStyles, setLeftStyles] = useState({ left: '500px' });
    let parsedVal = parseInt(leftStyles.left);
    // console.log(parsedVal);
    let boatImgRef = useRef(null);
    // let randomImgRef = useRef(null);
    // console.log(randomImgRef.current);

    //================= ImageArray to store image paths ==============//
    const ImgArray = ['/p1.png', '/p2.png', '/p3.png', '/p4.png', '/e1.png', '/e2.png']
    const randomIndex = Math.floor(Math.random() * 6)


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

        //=========================================================================================//
        //=== had to update randomImage state inside the useEffect because calling the setRandomImage function inside the component body triggers a re-render.
        // and it, in turn, causes the component to re-render infinitely, resulting in the error message.  

        setRandomImage(ImgArray[randomIndex]);

        // =====this is for changing random image === //

        //     const interval =  setInterval(() => {
        //     // console.log('random index',randomIndex);
        //     let image = ImgArray[randomIndex]
        //     // console.log(randomIndex);
        //     setRandomImage(image)
        //     console.log(randomImage);
        //    }, 1000);
        //=========================================================================================//
        //    return ()=> {
        //     clearInterval(interval)
        //    };
        //==code above is for changing random image==//      

    }, []);


    //============== this useEffect is for arrow movement ================//
    //=== By including leftStyles in the dependency array, the effect will be re-run whenever leftStyles changes===//
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
    }, [leftStyles]);


    //======= When we access the style property of an element immediately after rendering without using useEffect, it's possible that the element hasn't been fully rendered and
    //==  thats why we pass it inside useEffect to make sure the element has rendered at least once so that its value can be accessed.thus, we can access randomImgRef.current.style property==//
    //==otherwise  the initial value is null and if we access it immediately then it will be null or give errors//

    let randomImgRef = useRef(null);

    useEffect(() => {
        let randomImgElement = randomImgRef.current
        // console.log(randomImgElement);
        let parsedValue = parseInt(randomImgElement.style.bottom)
        // console.log('top val is', parsedValue);
        const interval = setInterval(() => {
            let newBottomValue = parsedValue - 10 + 'px'
            // console.log(randomImgStyle);
            let updateBottomStyle = {bottom: newBottomValue}
            console.log(updateBottomStyle);
            setRandomImgStyle(updateBottomStyle)
            // console.log('this is latest bottom style',randomImgStyle);
            // let boatImg = boatImgRef.current 
            // console.log('boatimg element',boatImg);
            // let parsedValue = parseInt(boatImg.style.height)
            // console.log('height of boat img',parsedValue);

        }, 100);
        return () => {
            clearInterval(interval);
        };

    }, [randomImgStyle])

// console.log(randomImgStyle);




    return (
        <div className='container'>
            <div className='heading'>
                <h1 className='gameHeading'>Catcher Game</h1>
            </div>

            <div className='subContainer'>
                <div className="bgImgContainer">
                    <div className='boatContainer'>

                        {<img className='randomImg'
                            style={randomImgStyle}
                            ref={randomImgRef}
                            src={randomImage}
                            alt="randomImg"

                        />}

                        <img
                            style={leftStyles}
                            ref={boatImgRef}
                            className='boatImg'
                            src="/boat.png"
                            alt="boat Image"
                        />
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
