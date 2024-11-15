export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('tooltip', {
    mounted(el, binding) {
      // Add necessary classes to the element
      el.classList.add('relative')

      // Create tooltip element
      const tooltip = document.createElement('span')
      tooltip.className = `v-tooltip grain${Math.floor(Math.random() * 10) + 1}`
      tooltip.textContent = binding.value

      // Add tooltip styles
      const style = document.createElement('style')
      style.textContent = `
        .v-tooltip {
          position: absolute;
          left: 50%;
          top: 50px;
          transform: translateX(-50%) rotate(-25deg);
          background-color: rgba(0, 0, 0, 0.8);
          color: linear-gradient(to right, #000000, #ffffff);
          font-size: 0.875rem;
          padding: 0.25rem 0.5rem;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }
        
        .relative:hover .v-tooltip {
          opacity: 1;
        }
      `
      document.head.appendChild(style)

      // Add tooltip to element
      el.appendChild(tooltip)
    },
    unmounted(el) {
      // Clean up tooltip when element is removed
      const tooltip = el.querySelector('.v-tooltip')
      if (tooltip) {
        tooltip.remove()
      }
    }
  })
}) 