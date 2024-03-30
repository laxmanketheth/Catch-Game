
import './App.css'
import LeaderBoard from './components/LeaderBoard/LeaderBoard'
import StartMenu from './components/StartMenu/StartMenu'
import GameScreen from './components/GameScreen/GameScreen'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScoreSubmitBox from './components/ScoreSubmitBox/ScoreSubmitBox'
import { Provider } from "react-redux"
import store from './store/store'


function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<StartMenu />} />
            <Route path='/startgame' element={<GameScreen />} />
            <Route path='/leaderboard' element={<LeaderBoard />} />
            <Route path='/saveScore' element={<ScoreSubmitBox />} />

          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
