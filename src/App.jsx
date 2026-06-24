import { useState } from 'react'
import SetupScreen from './screens/SetupScreen'
import WorkoutScreen from './screens/WorkoutScreen'
import PauseScreen from './screens/PauseScreen'
import BurnoutScreen from './screens/BurnoutScreen'
import DoneScreen from './screens/DoneScreen'
import { selectExercises, selectBurnout } from './exercises'

const SCREENS = {
  SETUP: 'setup',
  WORKOUT: 'workout',
  PAUSE: 'pause',
  BURNOUT: 'burnout',
  DONE: 'done',
}

function buildWorkout(config) {
  const exercises = selectExercises(config.exerciseCount, config.variantCount)
  const burnout = config.burnoutEnabled ? selectBurnout(config.variantCount) : null
  return { exercises, burnout }
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.SETUP)
  const [config, setConfig] = useState(null)
  const [workout, setWorkout] = useState(null)
  const [currentExIdx, setCurrentExIdx] = useState(0)
  const [muted, setMuted] = useState(false)
  const [completedExercises, setCompletedExercises] = useState([])

  function startWorkout(cfg) {
    const w = buildWorkout(cfg)
    setConfig(cfg)
    setWorkout(w)
    setCurrentExIdx(0)
    setCompletedExercises([])
    setScreen(SCREENS.WORKOUT)
  }

  function finishExercise(exercise) {
    setCompletedExercises(prev => [...prev, exercise])
    const isLast = currentExIdx >= workout.exercises.length - 1
    if (isLast) {
      if (config.burnoutEnabled) {
        setScreen(SCREENS.BURNOUT)
      } else {
        setScreen(SCREENS.DONE)
      }
    } else {
      setScreen(SCREENS.PAUSE)
    }
  }

  function resumeAfterPause() {
    setCurrentExIdx(i => i + 1)
    setScreen(SCREENS.WORKOUT)
  }

  function finishBurnout() {
    setScreen(SCREENS.DONE)
  }

  function reset() {
    setScreen(SCREENS.SETUP)
    setWorkout(null)
    setConfig(null)
    setCompletedExercises([])
  }

  const muteBtn = (
    <button
      onClick={() => setMuted(m => !m)}
      className="fixed z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur border border-gray-200 text-lg shadow-sm"
      style={{ top: 'max(16px, env(safe-area-inset-top))', right: '16px' }}
      aria-label={muted ? 'Ton an' : 'Ton aus'}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  )

  return (
    <div className="min-h-screen bg-white no-select">
      {screen !== SCREENS.SETUP && muteBtn}

      {screen === SCREENS.SETUP && (
        <SetupScreen onStart={startWorkout} />
      )}
      {screen === SCREENS.WORKOUT && workout && (
        <WorkoutScreen
          key={currentExIdx}
          exercise={workout.exercises[currentExIdx]}
          exerciseIndex={currentExIdx}
          totalExercises={workout.exercises.length}
          config={config}
          muted={muted}
          onFinish={() => finishExercise(workout.exercises[currentExIdx])}
        />
      )}
      {screen === SCREENS.PAUSE && workout && (
        <PauseScreen
          duration={config.pauseDuration}
          nextExercise={workout.exercises[currentExIdx + 1]}
          config={config}
          muted={muted}
          onResume={resumeAfterPause}
        />
      )}
      {screen === SCREENS.BURNOUT && workout?.burnout && (
        <BurnoutScreen
          exercise={workout.burnout}
          config={config}
          muted={muted}
          onFinish={finishBurnout}
        />
      )}
      {screen === SCREENS.DONE && (
        <DoneScreen
          exercises={completedExercises}
          config={config}
          burnoutDone={config?.burnoutEnabled}
          onReset={reset}
        />
      )}
    </div>
  )
}
