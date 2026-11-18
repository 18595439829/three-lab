import * as THREE from 'three';

const Scene = new THREE.Scene()

// 背景色：替换默认的黑色背景
Scene.background = new THREE.Color(0x87ceeb)

// 环境光：让背光面不至于全黑
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
Scene.add(ambientLight)

// 半球光：天空/地面两色环境光，让整体照明更自然
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444466, 0.6)
Scene.add(hemisphereLight)

// 平行光：提供方向性照明，MeshStandardMaterial 依赖它产生明暗
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
directionalLight.position.set(100, 200, 300)
Scene.add(directionalLight)

export default Scene
