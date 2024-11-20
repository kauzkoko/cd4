const spheres = [
	{ position: [1, 1.1, 0], color: 'green', params: { numArmsA: 40, numArmsB: 40, expA: [40, 30, 10] }, direction: 0.5, sound: '/strudel/c3major.mp3' },
	{ position: [-2, 1.1, 0], color: 'yellow', params: { numArmsA: 4, numArmsB: 8, expA: [30, 20, 10] }, direction: 0.5, sound: '/strudel/g3major.mp3' },
	{ position: [0, 1.1, 4], color: 'green', params: { numArmsA: 5, numArmsB: 10, expA: [20, 40, 10] }, direction: 0.5, sound: '/strudel/c3major.mp3' },
	{ position: [0, 1.1, -5], color: 'yellow', params: { numArmsA: 6, numArmsB: 12, expA: [40, 20, 10] }, direction: 0.5, sound: '/strudel/g3major.mp3' },
	{ position: [3, 1.1, 1], color: 'green', params: { numArmsA: 2, numArmsB: 1, expA: [30, 40, 10] }, direction: 0.5, sound: '/strudel/c3major.mp3' },
	{ position: [0, .5, 0], color: 'red', params: { numArmsA: 2, numArmsB: 2, expA: [10, 10, 10] }, cochonette: true, direction: 0.5, sound: '/strudel/e3major.mp3' },
]

export const useSpheresSounds = () => {
  const randomSpheres = ref(generateRandomPositions())
  watchStoreRef("randomSpheresCounter", (value) => {
    randomSpheres.value = generateRandomPositions()
  })
  return {
    spheres: randomSpheres,
  }
}

const generateRandomPositions = () => {
  const placedSpheres = []
  const sphereRadius = 0.5
  const minDistance = sphereRadius * 3
  const maxAttempts = 500
  const gridSize = 12
  
  return spheres.map(sphere => {
    let position
    let attempts = 0

    do {
      // Generate random position with larger area
      let x = sphere.cochonette ? 0 : Math.random() * gridSize - (gridSize/2)
      let z = sphere.cochonette ? 0 : Math.random() * gridSize - (gridSize/2)
      const y = sphere.cochonette ? 0.5 : 1.1

      // If not cochonette, ensure sphere is outside the central area
      if (!sphere.cochonette) {
        // Push spheres further out if they're too close to center
        if (Math.abs(x) < 1) {
          x = (x < 0 ? -1 : 1) * (1 + Math.random() * 2)
        }
        if (Math.abs(z) < 1) {
          z = (z < 0 ? -1 : 1) * (1 + Math.random() * 2)
        }
      }

      position = [x, y, z]
      attempts++

      // If we're struggling to place a sphere, gradually increase the distance from center
      if (attempts > maxAttempts / 2) {
        x = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 4)
        z = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 4)
        position = [x, y, z]
      }

      if (attempts >= maxAttempts) {
        console.warn('Forcing position placement after max attempts')
        // Force a position far from others
        x = (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 5)
        z = (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 5)
        position = [x, y, z]
        break
      }
    } while (isOverlapping(position, placedSpheres, minDistance))

    placedSpheres.push(position)
    return {
      ...sphere,
      position,
      direction: Math.random()
    }
  })
}

const isOverlapping = (newPosition, placedSpheres, minDistance) => {
  for (const existingPosition of placedSpheres) {
    const dx = newPosition[0] - existingPosition[0]
    const dy = newPosition[1] - existingPosition[1]
    const dz = newPosition[2] - existingPosition[2]
    const distanceSquared = dx * dx + dy * dy + dz * dz
    
    if (distanceSquared < minDistance * minDistance) {
      return true
    }
  }
  return false
}
