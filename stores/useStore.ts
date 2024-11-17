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
    const audioFiles = [
      '/strudel/c3major.mp3',
      '/strudel/e3major.mp3',
      '/strudel/g3major.mp3',
      '/shortdeep.mp3',
      '/waterBig.m4a',    
      '/waterBigger.m4a',
      '/waterMedium.m4a'
    ]
    const audioSrc = ref(audioFiles[0])
    let audioIndex = 0
    const switchAudioSrc = () => {
      audioIndex = (audioIndex + 1) % audioFiles.length
      audioSrc.value = audioFiles[audioIndex]
      console.log(audioSrc.value)
    }

    const { isFullscreen, enter, exit, toggle: toggleFullscreen } = useFullscreen()

    const randomSpheresCounter = ref(0)
    const toggleRandomSpheres = () => {
      randomSpheresCounter.value++
    }

    const selectedSpherePosition = ref({ x: 0, y: 0, z: 0 })


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
      toggleAudio,
      audioSrc,
      switchAudioSrc,
      isFullscreen,
      toggleFullscreen,
      selectedSpherePosition,
    };
  },
  {
    persist: [
      {
        pick: ['transforms', 'grid', 'sky', 'backdrop', 'levioso', 'cameraControls', 'randomSpheresCounter', 'audioSrc', 'selectedSpherePosition'],
      },
    ],
  }
);
