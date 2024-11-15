import Hydra from 'hydra-synth'

export const useHydra = (tresCanvas) => {
    const canvas = document.createElement('canvas')
    canvas.classList.add('fixed', 'top-0', 'left-0', 'fullScreen', 'pointer-events-none')
    document.body.appendChild(canvas)
    
    const h = new Hydra({ 
        global: false, 
        detectAudio: false, 
        canvas: canvas 
    }).synth
    h.setResolution(window.innerWidth, window.innerHeight)
    h.s0.init({src: tresCanvas })
    
    h.src(s0).kaleid().out()
    osc(10, 0.1, 1.2).blend(noise(3)).diff(s0).out()
    h.src(s0).blend(noise(3)).out()
    h.src(s0).modulate(shape(32), .3).out()
    h.src(s0).pixelate(40,40).out()

    return h
}