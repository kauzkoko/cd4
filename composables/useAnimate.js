import { animate } from '~/assets/anime/anime.esm.min.js';

export const useAnimate = (_ref, params = { x: 10, y: 10, z: 10 }) => {
    let animation = ref(null)
    watchEffect(() => {
      if (_ref.value) {
        let pos = _ref.value.position;
        console.log(params);
        animation.value = animate(pos, {
          ...params,
          autoplay: params.autoplay ?? false
        })
      }
    })
    return animation
}