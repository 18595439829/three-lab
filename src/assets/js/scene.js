import * as THREE from 'three';

const Scene = new THREE.Scene()

// 环境光：让背光面不至于全黑
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
Scene.add(ambientLight)

// 平行光：提供方向性照明，MeshStandardMaterial 依赖它产生明暗
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
directionalLight.position.set(100, 200, 300)
Scene.add(directionalLight)

export default Scene
