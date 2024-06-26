import React from 'react';
import './GameScreen.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addScore, minusScore } from '../../store/scoreSlice';


const GameScreen = () => {

    const [randomImgStyle, setRandomImgStyle] = useState({ bottom: '85%', left: '50%', display: 'block' });
    const [boatStyles, setBoatStyles] = useState({ left: '50%', height: '13%' });
    const [randomImage, setRandomImage] = useState('');
    const [topScore, setTopScore] = useState(0);
    const [imgContainerWidth, setImgContainerWidth] = useState();

    //== navigate hook is used later to navigating to saveScore box when the game time has expired ==//
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const score = useSelector(state => state.score.score);
    const endTime = useSelector(state => state.score.endTime);

    let base_url = 'https://catch-game-backend.vercel.app';

    /// *** using useRef hook *** ///
    let boatImgRef = useRef(null);
    let randomImgRef = useRef(null);

    //================= ImageArray to store image paths ==============//
    const ImgArray = ['p1.png', 'p2.png', 'p3.png', 'p4.png', 'e1.png', 'e2.png']
    const randomIndex = Math.floor(Math.random() * 6);




    //**** below logic is to add 50 points or minus 100 points according to the image caught by boat ****//
    const checkImgUrl = () => {
        let randomImg = randomImgRef.current // .current is object property available on useRef hook//
        let imgname = randomImg.name
        let image1 = 'e1.png'
        let image2 = 'e2.png'

        if (imgname === image1 || imgname === image2) {
            let updatedScore = - 100
            dispatch(minusScore(updatedScore));
        } else {
            let updatedScore = + 50
            dispatch(addScore(updatedScore));
        }
    };

    //==========checkIntersection function is to check if the boat touched the random image==========//

    //=== checkIntersection method checks the bottomValue of falling randomImg and checks it against the
    //===  height of boatImg inside the if statement so that score can be updated ====//
    const checkIntersection = () => {

        //======== accessing random image properties ==========//
        let randomImg = randomImgRef.current
        let imageBottomValue = parseInt(randomImg.style.bottom);
        let imgLeftValue = parseInt(randomImg.style.left);
        // console.log('img left val',imgLeftValue);

        //========== accessing boat image properties ===========//
        let boatImg = boatImgRef.current
        let boatHeightValue = parseInt(boatImg.style.height);
        let boatLeftValue = parseInt(boatImg.style.left);
        // console.log('boat left val',boatLeftValue);
        // console.log('img vale',imgLeftValue-boatLeftValue);

        //===== after the falling image touches the boat image height, the score is updated =====//
        if (boatHeightValue === imageBottomValue) {
            // in this case the boat image and random image are at same left value//
            if (imgLeftValue === boatLeftValue) {
                // console.log('intersection exists');
                //*** the function checkImgUrl is defined above ***//
                checkImgUrl();
            }

            ////////// I have commented following if and else statement because the score was increasing even when the image and boat were not intersecting,
            ////////// now since the image and boat are not intersecting at left or right so i am not using the below if else statement///

          // in this case the boat image is on left and random img is on right//
            else if (boatLeftValue < imgLeftValue) {
                if (imgLeftValue - boatLeftValue < 8) {
                    // console.log('left intersection exists');
                    checkImgUrl();
                }
            }
          //  in this case the boat image is on right and random img is on left//
            else {
                if (boatLeftValue - imgLeftValue < 8) {
                    // console.log('right intersection exists');
                    checkImgUrl();
                }
            }
        }
    };


    //========== this useEffect is for fetching data and setting highest score on page ==========//
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(base_url + '/')
            const data = await response.json()
            const scoresArray = data.map((item) => item.score)
            const highestScore = Math.max(...scoresArray);
            setTopScore(highestScore)
        }
        fetchData();

        //==== setting width of image container ====//
        setImgContainerWidth({ width: '80%', height: '100%' });

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

            if (parsedVal > 2 && e.key === 'ArrowLeft') {
                let boatImg = boatImgRef.current // .current is object property available on useRef hook//
                let parsedValue = parseInt(boatImg.style.left)
                let newValue = parsedValue - 8 + '%'
                setBoatStyles({ left: newValue, height: boatStyles.height })
            }

            if (parsedVal < 90 && e.key === "ArrowRight") {
                let boatImg = boatImgRef.current;
                let parsedValue = parseInt(boatImg.style.left);
                let newValue = parsedValue + 8 + "%";
                setBoatStyles({ left: newValue, height: boatStyles.height });
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

    if (Date.now() < endTime) {

        useEffect(() => {
            let randomImgElement = randomImgRef.current
            // need to parse the bottom value bcoz it is coming along with'px' or '%' and we only need numeric value//
            let imgBottomValue = parseInt(randomImgElement.style.bottom)
            const interval = setInterval(() => {
                let newBottomValue = imgBottomValue - 3 + '%'

                //================= this is to change the 'left value' randomly of the random images falling from top ========//
                const randomVal = Math.floor(Math.random() * 90); //generate numbers  between 0 and 90
                const newRandomLeftValue = randomVal + '%' 
                // console.log('randomval',newRandomLeftValue);

                setRandomImgStyle((prevStyle) => ({
                    ...prevStyle,
                    bottom: newBottomValue
                }));

                //== the function checkIntersection is defined above ===//
                checkIntersection();

                //=== below if statement to check so that random image starts dropping again from top once it hits the required bottom value ===//
                if (imgBottomValue === 10) {
                    setRandomImgStyle((prevStyle) => ({
                        ...prevStyle,
                        bottom: 85 + '%',
                        left: newRandomLeftValue  //== this will help to set the new left value of image when the image again goes back to top ==// 
                    }));
                    //== when image bottom value is again made 550px as stated in above line then setRandomImage method will give another random image from top ==//
                    setRandomImage(ImgArray[randomIndex]);
                };

            }, 50); //** this millisseconds control the speed of random images falling down */

            return () => {
                clearInterval(interval);   //If we don't clean up the interval when the dependency changes, the interval will keep running in the background, even if 
                //the component is no longer rendered. This can lead to memory leaks and unexpected behavior.
            };

        }, [randomImgStyle])
    }

    if (Date.now() >= endTime) {
        navigate("/saveScore");//navigate hook is navigating to saveScore box when the game time has expired// 
    }


    return (
        <div className='container main-container'>
            <div className='heading'>
                <h1 className='gameHeading'>Catch Fever</h1>
            </div>

            <div className='subContainer sub-container'>
                <div className="bgImgContainer"
                    style={imgContainerWidth}
                >
                    <div className='boatContainer'>

                        {<img className='randomImg'
                            style={randomImgStyle}
                            ref={randomImgRef}
                            src={randomImage}
                            name={randomImage}
                            alt="randomImg"
                        />}

                        <img
                            className='boatImg'
                            style={boatStyles}
                            ref={boatImgRef}
                            src="/boat.png"
                            alt="boat Image"
                        />
                    </div>
                </div>

                <div className="statsContainer">
                    <Link to={'/'}><button className='homebtn'>go home</button></Link>
                    <div className='yourScore'>
                        <span>Your Score</span>
                        <h3>{score}</h3>
                        <Link to={'/saveScore'}> <button className='homebtn home-btn'>Save Score</button></Link>
                    </div>
                    <div className='highestScore'><span>Highest Score</span>
                        <h3>{topScore}</h3>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default GameScreen;

