export const useStore = defineStore(
  "websiteStore",
  () => {
    const [transforms, toggleTransforms] = useToggle(false)
    const [levioso, toggleLevioso] = useToggle(false)
    const [grid, toggleGrid] = useToggle(false)
    const [sky, toggleSky] = useToggle(false)
    const [backdrop, toggleBackdrop] = useToggle(false)
    const [cameraControls, toggleCameraControls] = useToggle(true)
    const [audio, toggleAudio] = useToggle(false)
    const animateCounter = ref(0)
    const animate = () => {
      animateCounter.value++
    }

    const randomSpheresCounter = ref(0)
    const toggleRandomSpheres = () => {
      randomSpheresCounter.value++
    }


    return {
      transforms,
      toggleTransforms,
      grid,
      toggleGrid,
      sky,
      toggleSky,
      backdrop,
      toggleBackdrop,
      animateCounter,
      animate,
      levioso,
      toggleLevioso,
      cameraControls,
      toggleCameraControls,
      randomSpheresCounter,
      toggleRandomSpheres,
      audio,
      toggleAudio
    };
  },
  {
    persist: [
      {
        pick: ['transforms', 'grid', 'sky', 'backdrop', 'levioso', 'cameraControls', 'randomSpheresCounter'],
      },
    ],
  }
);
