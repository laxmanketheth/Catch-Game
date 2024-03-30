import React from 'react'
import './GameScreen.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useRef } from 'react';

const GameScreen = () => {

    const [randomImgStyle, setRandomImgStyle] = useState({ bottom: '550px', left: '500px', display: 'block' });
    const [boatStyles, setBoatStyles] = useState({ left: '500px', height: '120px' });
    const [randomImage, setRandomImage] = useState('');
    const [topScore, setTopScore] = useState(0);
    const [score, setScore] = useState(0);
  
    // === using useRef hook === //
    let boatImgRef = useRef(null);
    let randomImgRef = useRef(null);

    //================= ImageArray to store image paths ==============//
    const ImgArray = ['/p1.png', '/p2.png', '/p3.png', '/p4.png', '/e1.png', '/e2.png']
    const randomIndex = Math.floor(Math.random() * 6);


    // ===making use of useState for scoreIncreased so that score increases only once===//
    const [scoreIncreased, setScoreIncreased] = useState(false);


    //=== below logic is to add 50 points or minus 100 points according to the image caught by boat ====//
    const checkImgUrl = () => {
        let randomImg = randomImgRef.current // .current is object property available on useRef hook//
        let imgUrl = randomImg.src
        let image1 = 'http://localhost:5173/e1.png'
        let image2 = 'http://localhost:5173/e2.png'
        if (imgUrl == image1 || imgUrl == image2) {
            setScore(score -100);
            setScoreIncreased(true);
        } else {
            setScore(score + 50);
            setScoreIncreased(true);
        }

        // if(scoreIncreased){
        //     setRandomImage(ImgArray[randomIndex]); 
        // }
        
    };

    //==========checkIntersection function is to check if the boat touched the random image==========//

    //=== checkIntersection method checks the bottomValue of falling randomImg and checks it against the
    //===  height of boatImg inside the if statement so that score can be updated ====//
    const checkIntersection = () => {

        //======== accessing random image properties ==========//
        let randomImg = randomImgRef.current
        let parsedBottomValue = parseInt(randomImg.style.bottom);
        // let newDisplayProperty = 'none'
        let ImgLeftValue = parseInt(randomImg.style.left)
        // console.log('image left Value',ImgLeftValue);

        //======== accessing boat image properties ==========//
        let boatImg = boatImgRef.current
        let parsedHeightValue = parseInt(boatImg.style.height);
        let boatLeftValue = parseInt(boatImg.style.left)

        //after the falling image touches the boat image height, the score is updated and the display of the falling image is set to none//
        if (parsedHeightValue >= parsedBottomValue && ImgLeftValue === boatLeftValue && !scoreIncreased) {

            //****** the function checkImgUrl is defined above ******//
            checkImgUrl();

            //******** updating display property of randomImgStyle using spread opeartor *******//
            setRandomImgStyle(prevStyle => ({
                ...prevStyle,
                // display: newDisplayProperty
                display : 'none'
            }));

            //******setting display back to 'block so that image dropping again is visible*****//
            setRandomImgStyle((prevStyle) => ({
                ...prevStyle,
                display:'block'
            }));
            // console.log(randomImgStyle.bottom);
        }
    };


    //========== this useEffect is for fetching data and setting highest score on page ==========//
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

         // =====this is for changing random image, it is kept here inside this useState because this useState has an
         //=== empty dependency array which means it will render when the browser refreshes and hence it will give us random images when browser refresher === //
        setRandomImage(ImgArray[randomIndex]);
        //=========================================================================================//   

    }, []);


    //============== this useEffect is for the movement of boat on arrow left and right ================//
    //=== By including boatLeftStyle in the dependency array, the effect will be re-run whenever leftStyles changes===//
    useEffect(() => {
        const handleKeyPress = (e) => {

            let parsedVal = parseInt(boatStyles.left);

            if (parsedVal > 0 && e.key === 'ArrowLeft') {
                let boatImg = boatImgRef.current // .current is object property available on useRef hook//
                let parsedValue = parseInt(boatImg.style.left)
                let newValue = parsedValue - 50 + 'px'
                setBoatStyles({ left: newValue, height: boatStyles.height })
            }
            if (parsedVal < 1050 && e.key === 'ArrowRight') {
                let boatImg = boatImgRef.current
                let parsedValue = parseInt(boatImg.style.left)
                let newValue = parsedValue + 50 + 'px'
                setBoatStyles({ left: newValue, height: boatStyles.height })
            }
        };

        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [boatStyles]);


    //======= When we access the style property of an element immediately after rendering without using useEffect, it's possible that the element hasn't been fully rendered and
    //==  thats why we pass it inside useEffect to make sure the element has rendered at least once so that its value can be accessed.thus, we can access randomImgRef.current.style property==//
    //==otherwise  the initial value is null and if we access it immediately then it will be null or give errors//



    // =============== this useEffect is for dropping down the random image from top =============//
    useEffect(() => {
        let randomImgElement = randomImgRef.current
        // console.log(randomImgElement);
        // need to parse the bottom value bcoz it is coming along with 'px' and we only need numeric value//
        let imgBottomValue = parseInt(randomImgElement.style.bottom) 
        const interval = setInterval(() => {
        let newBottomValue = imgBottomValue - 20 + 'px'

            setRandomImgStyle((prevStyle) => ({
                ...prevStyle,
                bottom: newBottomValue
            }));

            //== the function checkIntersection is defined above ===//
            checkIntersection();
          
            // below if statement to check so that random image starts dropping again from top //
            if(imgBottomValue === -10){
                setRandomImgStyle((prevStyle) => ({
                    ...prevStyle,
                    bottom: 550 + 'px'
                }));
                //when image bottom value is again made 550px as stated in above line then setRandomImage method will give another random image from top//
                setRandomImage(ImgArray[randomIndex]); 
            };
           

        }, 100);
        return () => {
            clearInterval(interval);
        };

    }, [randomImgStyle])



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
                            style={boatStyles}
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
                        <h3>{score}</h3>
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
