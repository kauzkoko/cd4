import { animate } from '~/assets/anime/anime.esm.min.js';

export const useAnimate = (_ref, params = { type: 'position', x: 10, y: 10, z: 10 }) => {
    let animation = ref(null)
    watchEffect(() => {
      if (_ref.value) {
        let pos = _ref.value[params.type];
        animation.value = animate(_ref.value[params.type ?? 'position'], {
          ...params,
          autoplay: params.autoplay ?? false
        })
      }
    })
    return animation
}