
import './App.css'
import LeaderBoard from './components/LeaderBoard/LeaderBoard'
import StartMenu from './components/StartMenu/StartMenu'
import GameScreen from './components/GameScreen/GameScreen'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScoreSubmitBox from './components/ScoreSubmitBox/ScoreSubmitBox'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element= {<StartMenu />} />
          <Route path='/startgame' element= {<GameScreen />} />
          <Route path='/leaderboard' element= {<LeaderBoard />} />
          <Route path='/saveScore' element= {<ScoreSubmitBox/>}/>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
