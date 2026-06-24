import { useState } from 'react'
import LockScreen from './screens/LockScreen'
import SetupScreen from './screens/SetupScreen'
import ExercisePreviewScreen from './screens/ExercisePreviewScreen'
import PlanBuilderScreen from './screens/PlanBuilderScreen'
import WorkoutScreen from './screens/WorkoutScreen'
import PauseScreen from './screens/PauseScreen'
import BurnoutScreen from './screens/BurnoutScreen'
import DoneScreen from './screens/DoneScreen'
import { selectExercises, selectBurnout, EXERCISES } from './exercises'
import useSavedPlans from './hooks/useSavedPlans'

const S = { SETUP: 0, PREVIEW: 1, BUILDER: 2, WORKOUT: 3, PAUSE: 4, BURNOUT: 5, DONE: 6 }

export default function App() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('corefit_unlocked') === '1'
  )
  const [screen, setScreen] = useState(S.SETUP)
  const [config, setConfig] = useState(null)
  const [exercises, setExercises] = useState([])
  const [burnout, setBurnout] = useState(null)
  const [currentExIdx, setCurrentExIdx] = useState(0)
  const [muted, setMuted] = useState(false)
  const [completedExercises, setCompletedExercises] = useState([])
  const { plans, savePlan, deletePlan } = useSavedPlans()

  // Setup → Preview (zufällig)
  function handleSetupDone(cfg) {
    const exs = selectExercises(cfg.exerciseCount, cfg.selectedLevels)
    const bo = cfg.burnoutEnabled ? selectBurnout(cfg.selectedLevels) : null
    setConfig(cfg)
    setExercises(exs)
    setBurnout(bo)
    setScreen(S.PREVIEW)
  }

  // Setup → Builder (eigener Plan)
  function handleOpenBuilder(cfg) {
    setConfig(cfg)
    setScreen(S.BUILDER)
  }

  // Load saved plan directly to preview
  function handleLoadPlan(plan) {
    const cfg = plan.config
    setConfig(cfg)
    const exs = plan.exercises
      .map(id => EXERCISES.find(e => e.id === id))
      .filter(Boolean)
      .map(ex => ({ ...ex, variants: ex.variants.filter(v => cfg.selectedLevels.includes(v.level)) }))
    const bo = cfg.burnoutEnabled ? selectBurnout(cfg.selectedLevels) : null
    setExercises(exs)
    setBurnout(bo)
    setScreen(S.PREVIEW)
  }

  // Builder → Preview
  function handleBuilderConfirm(confirmedExercises, planName) {
    if (planName) {
      savePlan(planName, confirmedExercises, config)
    }
    setExercises(confirmedExercises)
    const bo = config.burnoutEnabled ? selectBurnout(config.selectedLevels) : null
    setBurnout(bo)
    setScreen(S.PREVIEW)
  }

  // Preview → Workout
  function handlePreviewConfirm(confirmedExercises) {
    setExercises(confirmedExercises)
    setCurrentExIdx(0)
    setCompletedExercises([])
    setScreen(S.WORKOUT)
  }

  // Save plan from preview
  function handleSavePlanFromPreview(name, exs) {
    savePlan(name, exs, config)
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
      {!unlocked && <LockScreen onUnlock={() => setUnlocked(true)} />}
      {unlocked && screen >= S.WORKOUT && muteBtn}

      {unlocked && screen === S.SETUP && (
        <SetupScreen
          onStart={handleSetupDone}
          onOpenBuilder={handleOpenBuilder}
          savedPlans={plans}
          onLoadPlan={handleLoadPlan}
          onDeletePlan={deletePlan}
        />
      )}
      {unlocked && screen === S.PREVIEW && (
        <ExercisePreviewScreen
          exercises={exercises}
          selectedLevels={config.selectedLevels}
          onConfirm={handlePreviewConfirm}
          onBack={() => setScreen(S.SETUP)}
          onSavePlan={handleSavePlanFromPreview}
        />
      )}
      {unlocked && screen === S.BUILDER && (
        <PlanBuilderScreen
          selectedLevels={config.selectedLevels}
          config={config}
          onConfirm={handleBuilderConfirm}
          onBack={() => setScreen(S.SETUP)}
        />
      )}
      {unlocked && screen === S.WORKOUT && (
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
      {unlocked && screen === S.PAUSE && (
        <PauseScreen
          duration={config.pauseDuration}
          nextExercise={exercises[currentExIdx + 1]}
          config={config}
          muted={muted}
          onResume={resumeAfterPause}
        />
      )}
      {unlocked && screen === S.BURNOUT && burnout && (
        <BurnoutScreen
          exercise={burnout}
          config={config}
          muted={muted}
          onFinish={() => setScreen(S.DONE)}
        />
      )}
      {unlocked && screen === S.DONE && (
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
