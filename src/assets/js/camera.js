import * as THREE from 'three';

const Camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
)
Camera.position.set(0, 0, 800)
Camera.lookAt(0, 0, 0)

export default Camera
