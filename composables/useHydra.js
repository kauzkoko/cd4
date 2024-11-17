import Hydra from 'hydra-synth'

export const useHydra = (tresCanvas) => {
    const canvas = document.createElement('canvas')
    canvas.classList.add('fixed', 'top-0', 'left-0', 'fullScreen', 'pointer-events-none')
    document.body.appendChild(canvas)
    
    const { isFullscreen } = storeToRefs(useStore())
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    let h = new Hydra({ 
        global: false, 
        detectAudio: false, 
        canvas: canvas,
        width: window.innerWidth,
        height: window.innerHeight
    }).synth
    
    h.s0.init({ src: tresCanvas })

    watch([isFullscreen], () => {
        h = new Hydra({ 
            global: false, 
            detectAudio: false, 
            canvas: canvas,
            width: window.width,
            height: window.height
        }).synth

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        h.setResolution(window.width, window.height)
        h.s0.init({ src: tresCanvas })
        h.src(s0).pixelate(200, 100).out()
    })
    
    h.src(s0).pixelate(200, 100).out()


    return h
}