import * as THREE from 'three';
import Scene from '../scene';
 
// 球
const sphere = new THREE.SphereGeometry(50)
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    opacity: 0.5
})

const sphereMesh = new THREE.Mesh(sphere, material)
sphereMesh.position.set(0,0,0)

Scene.add(sphereMesh)

export default sphereMesh