import { useState } from 'react'
import LockScreen from './screens/LockScreen'
import SetupScreen from './screens/SetupScreen'
import ExercisePreviewScreen from './screens/ExercisePreviewScreen'
import PlanBuilderScreen from './screens/PlanBuilderScreen'
import AdminScreen from './screens/AdminScreen'
import WorkoutScreen from './screens/WorkoutScreen'
import PauseScreen from './screens/PauseScreen'
import BurnoutScreen from './screens/BurnoutScreen'
import DoneScreen from './screens/DoneScreen'
import { selectExercises, selectExercisesSingle, selectBurnout, EXERCISES } from './exercises'
import useSavedPlans from './hooks/useSavedPlans'
import useSharedPlans from './hooks/useSharedPlans'
import useExerciseMedia from './hooks/useExerciseMedia'
import useGlobalExercises from './hooks/useGlobalExercises'
import useLocalExercises from './hooks/useLocalExercises'

const S = { SETUP: 0, PREVIEW: 1, BUILDER: 2, WORKOUT: 3, PAUSE: 4, BURNOUT: 5, DONE: 6, ADMIN: 7 }

const ADMIN_PASSWORD = 'Absolution#Admin'

export default function App() {
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem('corefit_unlocked') === '1'
  )
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem('corefit_admin') === '1'
  )
  const [screen, setScreen] = useState(S.SETUP)
  const [config, setConfig] = useState(null)
  const [exercises, setExercises] = useState([])
  const [burnout, setBurnout] = useState(null)
  const [currentExIdx, setCurrentExIdx] = useState(0)
  const [muted, setMuted] = useState(false)
  const [completedExercises, setCompletedExercises] = useState([])

  const { plans: localPlans, savePlan, deletePlan } = useSavedPlans()
  const { sharedPlans, publishPlan, unpublishPlan } = useSharedPlans()
  const { media, setExerciseMedia, removeExerciseMedia } = useExerciseMedia()
  const { globalExercises, addGlobalExercise, removeGlobalExercise } = useGlobalExercises()
  const { localExercises, addLocalExercise, removeLocalExercise } = useLocalExercises()

  const allExtraExercises = [...globalExercises, ...localExercises]

  function handleUnlock(password) {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('corefit_unlocked', '1')
      localStorage.setItem('corefit_admin', '1')
      setIsAdmin(true)
      setUnlocked(true)
    }
  }

  function handleAdminSwitch(password) {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('corefit_admin', '1')
      setIsAdmin(true)
      return true
    }
    return false
  }

  function handleAdminLogout() {
    localStorage.removeItem('corefit_admin')
    setIsAdmin(false)
  }

  function handleSetupDone(cfg) {
    const exs = cfg.workoutMode === 'single'
      ? selectExercisesSingle(cfg.exerciseCount, cfg.selectedLevels, allExtraExercises, cfg.availableEquipment)
      : selectExercises(cfg.exerciseCount, cfg.selectedLevels, allExtraExercises, cfg.availableEquipment)
    const bo = cfg.burnoutEnabled ? selectBurnout(cfg.selectedLevels) : null
    setConfig(cfg)
    setExercises(exs)
    setBurnout(bo)
    setScreen(S.PREVIEW)
  }

  function handleOpenBuilder(cfg) {
    setConfig(cfg)
    setScreen(S.BUILDER)
  }

  function handleLoadPlan(plan, isShared = false) {
    const cfg = plan.config
    setConfig(cfg)
    const allEx = [...EXERCISES, ...allExtraExercises]
    const mapped = plan.exercises
      .map(id => allEx.find(e => e.id === id))
      .filter(Boolean)
    const exs = cfg.workoutMode === 'single'
      ? mapped.map((ex, i) => {
          const level = cfg.selectedLevels[i % cfg.selectedLevels.length]
          const variant = ex.variants.find(v => v.level === level) || ex.variants.find(v => cfg.selectedLevels.includes(v.level))
          return { ...ex, variants: variant ? [variant] : [] }
        }).filter(ex => ex.variants.length > 0)
      : mapped.map(ex => ({ ...ex, variants: ex.variants.filter(v => cfg.selectedLevels.includes(v.level)) }))
    const bo = cfg.burnoutEnabled ? selectBurnout(cfg.selectedLevels) : null
    setExercises(exs)
    setBurnout(bo)
    setScreen(S.PREVIEW)
  }

  function handleBuilderConfirm(confirmedExercises, planName) {
    if (planName) savePlan(planName, confirmedExercises, config)
    // In single mode, each exercise keeps only the variant matching its assigned level
    const exs = config.workoutMode === 'single'
      ? confirmedExercises.map((ex, i) => {
          const level = config.selectedLevels[i % config.selectedLevels.length]
          const variant = ex.variants.find(v => v.level === level) || ex.variants[0]
          return { ...ex, variants: variant ? [variant] : ex.variants }
        })
      : confirmedExercises
    setExercises(exs)
    setBurnout(config.burnoutEnabled ? selectBurnout(config.selectedLevels) : null)
    setScreen(S.PREVIEW)
  }

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
    <button onClick={() => setMuted(m => !m)}
      className="fixed z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur border border-gray-200 text-lg shadow-sm"
      style={{ top: 'max(16px, env(safe-area-inset-top))', right: '16px' }}>
      {muted ? '🔇' : '🔊'}
    </button>
  )

  return (
    <div className="bg-white no-select" style={{ height: '100dvh', overflow: 'hidden' }}>
      {!unlocked && (
        <LockScreen onUnlock={() => {
          localStorage.setItem('corefit_unlocked', '1')
          setUnlocked(true)
        }} onAdminUnlock={handleUnlock} />
      )}

      {unlocked && screen >= S.WORKOUT && screen < S.ADMIN && muteBtn}

      {unlocked && screen === S.SETUP && (
        <SetupScreen
          onStart={handleSetupDone}
          onOpenBuilder={handleOpenBuilder}
          onOpenAdmin={() => setScreen(S.ADMIN)}
          savedPlans={localPlans}
          sharedPlans={sharedPlans}
          onLoadPlan={handleLoadPlan}
          onDeletePlan={deletePlan}
          isAdmin={isAdmin}
          onAdminSwitch={handleAdminSwitch}
          onAdminLogout={handleAdminLogout}
        />
      )}
      {unlocked && screen === S.PREVIEW && (
        <ExercisePreviewScreen
          exercises={exercises}
          selectedLevels={config.selectedLevels}
          availableEquipment={config.availableEquipment || ['none']}
          onConfirm={handlePreviewConfirm}
          onBack={() => setScreen(S.SETUP)}
          onSavePlan={(name, exs) => savePlan(name, exs, config)}
          extraExercises={allExtraExercises}
        />
      )}
      {unlocked && screen === S.BUILDER && (
        <PlanBuilderScreen
          selectedLevels={config.selectedLevels}
          config={config}
          onConfirm={handleBuilderConfirm}
          onBack={() => setScreen(S.SETUP)}
          globalExercises={globalExercises}
          localExercises={localExercises}
          onAddLocalExercise={addLocalExercise}
          onRemoveLocalExercise={removeLocalExercise}
        />
      )}
      {unlocked && screen === S.ADMIN && (
        <AdminScreen
          sharedPlans={sharedPlans}
          onPublishPlan={publishPlan}
          onUnpublishPlan={unpublishPlan}
          media={media}
          onSetMedia={setExerciseMedia}
          onRemoveMedia={removeExerciseMedia}
          localPlans={localPlans}
          onBack={() => setScreen(S.SETUP)}
          globalExercises={globalExercises}
          onAddGlobalExercise={addGlobalExercise}
          onRemoveGlobalExercise={removeGlobalExercise}
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
          media={media}
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
