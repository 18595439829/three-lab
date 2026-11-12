import * as THREE from 'three';
import Scene from '../scene';

const Geometry = new THREE.BoxGeometry(10, 10, 10)

const Material = new THREE.MeshBasicMaterial({
  color: 0xff0000, // 红色
})

const createBoxMesh = (geometry = Geometry, material = Material) => {
  return new THREE.Mesh(geometry, material)
}

const createMeshs = (num) => {
  for (let index = 0; index < num; index++) {
    const mesh = createBoxMesh()
    // 沿 x 轴排开，居中在原点附近
    mesh.position.set((index - num / 2) * 11, 0, 0)
    Scene.add(mesh)
  }
}

createMeshs(100)

