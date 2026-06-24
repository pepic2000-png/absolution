import { useState } from 'react'
import SetupScreen from './screens/SetupScreen'
import ExercisePreviewScreen from './screens/ExercisePreviewScreen'
import WorkoutScreen from './screens/WorkoutScreen'
import PauseScreen from './screens/PauseScreen'
import BurnoutScreen from './screens/BurnoutScreen'
import DoneScreen from './screens/DoneScreen'
import { selectExercises, selectBurnout } from './exercises'

const S = { SETUP: 0, PREVIEW: 1, WORKOUT: 2, PAUSE: 3, BURNOUT: 4, DONE: 5 }

export default function App() {
  const [screen, setScreen] = useState(S.SETUP)
  const [config, setConfig] = useState(null)
  const [exercises, setExercises] = useState([])
  const [burnout, setBurnout] = useState(null)
  const [currentExIdx, setCurrentExIdx] = useState(0)
  const [muted, setMuted] = useState(false)
  const [completedExercises, setCompletedExercises] = useState([])

  // Setup → Preview
  function handleSetupDone(cfg) {
    const exs = selectExercises(cfg.exerciseCount, cfg.selectedLevels)
    const bo = cfg.burnoutEnabled ? selectBurnout(cfg.selectedLevels) : null
    setConfig(cfg)
    setExercises(exs)
    setBurnout(bo)
    setScreen(S.PREVIEW)
  }

  // Preview confirmed (possibly with swapped exercises)
  function handlePreviewConfirm(confirmedExercises) {
    setExercises(confirmedExercises)
    setCurrentExIdx(0)
    setCompletedExercises([])
    setScreen(S.WORKOUT)
  }

  function finishExercise(exercise) {
    setCompletedExercises(prev => [...prev, exercise])
    const isLast = currentExIdx >= exercises.length - 1
    if (isLast) {
      setScreen(config.burnoutEnabled && burnout ? S.BURNOUT : S.DONE)
    } else {
      setScreen(S.PAUSE)
    }
  }

  function resumeAfterPause() {
    setCurrentExIdx(i => i + 1)
    setScreen(S.WORKOUT)
  }

  function reset() {
    setScreen(S.SETUP)
    setExercises([])
    setBurnout(null)
    setConfig(null)
    setCompletedExercises([])
    setCurrentExIdx(0)
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
    <div className="bg-white no-select" style={{ height: '100dvh', overflow: 'hidden' }}>
      {screen >= S.WORKOUT && muteBtn}

      {screen === S.SETUP && (
        <SetupScreen onStart={handleSetupDone} />
      )}
      {screen === S.PREVIEW && (
        <ExercisePreviewScreen
          exercises={exercises}
          selectedLevels={config.selectedLevels}
          onConfirm={handlePreviewConfirm}
          onBack={() => setScreen(S.SETUP)}
        />
      )}
      {screen === S.WORKOUT && (
        <WorkoutScreen
          key={currentExIdx}
          exercise={exercises[currentExIdx]}
          exerciseIndex={currentExIdx}
          totalExercises={exercises.length}
          config={config}
          muted={muted}
          onFinish={() => finishExercise(exercises[currentExIdx])}
        />
      )}
      {screen === S.PAUSE && (
        <PauseScreen
          duration={config.pauseDuration}
          nextExercise={exercises[currentExIdx + 1]}
          config={config}
          muted={muted}
          onResume={resumeAfterPause}
        />
      )}
      {screen === S.BURNOUT && burnout && (
        <BurnoutScreen
          exercise={burnout}
          config={config}
          muted={muted}
          onFinish={() => setScreen(S.DONE)}
        />
      )}
      {screen === S.DONE && (
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
