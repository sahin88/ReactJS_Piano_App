import { useRef, useState, useEffect, Fragment } from 'react'
import './App.css';
import ReactAudioPlayer from 'react-audio-player';
import La from './notes/La.mp3'
import Si from './notes/Si.mp3'
import Do from './notes/Do.mp3'
import Re from './notes/Re.mp3'
import Mi from './notes/Mi.mp3'
import Fa from './notes/Fa.mp3'
import Sol from './notes/Sol.mp3'
import SolBemol from './notes/SolBemol.mp3'
import LaDiyez from './notes/LaDiyez.mp3'
import MiBemol from './notes/MiBemol.mp3'
import SiBemol from './notes/SiBemol.mp3'
import ReDiyez from './notes/ReDiyez.mp3'
import { makeStyles, Button } from '@material-ui/core'

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import {GiLoveSong} from 'react-icons/gi';
import SaveIcon from '@material-ui/icons/Save';

function App() {
  const audio = useRef()
  const graphics = useRef()
  const piano = useRef()
  const [lied, setMyLied] = useState([7, 7, 9, 11, 11, 9, 7, 5, 4, 4, 5, 7, 7, 5, 5, 7, 7, 9, 11, 11, 9, 7, 5, 4, 4, 5, 7, 5, 4, 4, 5, 5, 5, 7, 4, 5, 5, 5, 7, 4, 5, 7, 9, 7, 5, 4, 5,1,1,1,1,1,1])
  const [sleepTime, setSleepTime] = useState(1000)
  const [pianoKey, setPianoKey] = useState(lied[0])
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0)
  const [leedStep, setLeedStep] = useState(0)
  const [pianoState,  setPianoState]= useState('playPiano')

  // Sleeping for async function
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Following the song
  const getRandomInt = (index) => {
    setLeedStep(index)
    cleanKeyBoard();
    piano.current.children[lied[index]].style.backgroundColor = 'green';
  }

  // Clean KeyBoard
  const cleanKeyBoard = () => {
    for (let i = 0; i < piano.current.children.length; i++) {
      if (i == 1 || i == 3 || i == 6 || i == 8 || i == 10) {
        piano.current.children[i].style.backgroundColor = 'black'
      }
      else {
        piano.current.children[i].style.backgroundColor = '#fff'
      }
    }
  }

  const checkUsergetPoints = (index) => {
  
    let userClickedRight = false;
    if (lied[leedStep] == index) {
      setScore(score + 1)
      userClickedRight = true;
      setMaxScore(score + 1 > maxScore ? score + 1 : maxScore)
    }
    else {
      setScore(0)
    }
    cleanAndSetNewAnimation(index, userClickedRight);
  }

  //Clean Animation
  const cleanAndSetNewAnimation = (index, userClickedRight=null) => {
    for (let i = 0; i < graphics.current.children.length; i++) {
      graphics.current.children[i].style.animationName = ''
    }
    if (userClickedRight) {
      graphics.current.children[index].style.backgroundColor = 'green'
    }
    graphics.current.children[index].style.animationName = 'pendel'
  }

  // Setting Interval
  useEffect(() => {
    if( pianoState=='followSong'){
      piano.current.children[pianoKey].style.backgroundColor = 'green';
      async function fetchData() {
       for( let i=0; i<lied.length; i++){
                            await sleep(1000)
                            getRandomInt(i)}
                          }
                          fetchData(); 
                        
      }
    else{
      cleanKeyBoard();
    }
    // 
  
  
  }, [pianoState])

  const handleChange=(variable)=>{ 
        setPianoState(variable)
    }
  

  const playNote = (fileName, index) => {
    switch(pianoState){
      case 'playPiano':
          audio.current.currentTime = 0
          audio.current.src = fileName
          audio.current.play()
          setPianoKey(null)
          cleanAndSetNewAnimation(index);
          break
      case 'followSong':
        audio.current.currentTime = 0
        audio.current.src = fileName
        audio.current.play()
        checkUsergetPoints(index)
        break
      default:
        audio.current.currentTime = 0
        audio.current.src = fileName
        audio.current.play()
    }

  
  }
  return (
    <div className="App">
              <div className="piano_user_info">
        <div className="piano_user_info_score_table">
        <h1>Piano App</h1>
       {pianoState!=='playPiano'?(<Fragment><h2>Maxiumum Score {maxScore}</h2><h2>Your Score {score}</h2><h2>Sleep Time {sleepTime} ms</h2><h2>Leed Step {leedStep} ms</h2></Fragment>):null}
        
          </div>
          <div className="piano_user_info_button_group">
          <Button
              type="button"
              className="signin_button_group_buttons"
                        color="primary"
                        variant="contained"
                        endIcon={<PlayArrowIcon />}
                        onClick={()=>(handleChange('playPiano'))}
                        >
                        Play Piano 
                    </Button>

                    <Button
                        type="button"
                        className="signin_button_group_buttons"
                        style={{backgroundColor: '#DB4437', color: '#FFFFFF'}}
                        variant="contained"
                        onClick={()=>(handleChange('followSong'))}
                        endIcon={<GiLoveSong />}>
                        Follow Song 
                    </Button>

                    <Button
                        type="button"
                        className="signin_button_group_buttons"
                        style={{backgroundColor: '#12824C', color: '#FFFFFF'}}
                        variant="contained"
                        onClick={()=>(handleChange('resetpass'))}
                        endIcon={<SaveIcon />}>
                       Save MySong
                    </Button>
                    </div>
               

        </div>
      <div className="pianoKeyFrame">

        <div class="piano" ref={piano}>
          <div className="key white" onClick={() => playNote(La, 0)}></div>
          <div type='button' onClick={() => playNote(LaDiyez, 1)} className="key black"></div>
          <div onClick={() => playNote(Si, 2)} className="key white"></div>
          <div onClick={() => playNote(SiBemol, 3)} className="key black"></div>
          <div onClick={() => playNote(Do, 4)} className="key white">Do</div>
          <div onClick={() => playNote(Re, 5)} className="key white"></div>
          <div onClick={() => playNote(ReDiyez, 6)} className="key black"></div>
          <div onClick={() => playNote(Mi, 7)} className="key white"></div>
          <div onClick={() => playNote(MiBemol, 8)} className="key black"></div>
          <div onClick={() => playNote(Fa, 9)} className="key white"></div>
          <div onClick={() => playNote(SolBemol, 10)} className="key black"></div>
          <div onClick={() => playNote(Sol, 11)} className="key white"></div>
          <audio
            ref={audio}
          />
        </div>

        <div className='graphics' ref={graphics}>
          <div className='bars'>  </div>
          <div className='bars'>  </div>
          <div className='bars'>  </div>
          <div className='bars'>  </div>
          <div className='bars'>  </div>
          <div className='bars'>  </div>
          <div className='bars'>  </div>
          <div className='bars'>  </div>
          <div className='bars'>  </div>
          <div className='bars'>  </div>
          <div className='bars'>  </div>
          <div className='bars'>  </div>
        </div>

      </div>



    </div >);
}

export default App;
