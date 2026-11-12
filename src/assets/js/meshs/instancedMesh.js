import * as THREE from 'three';
import Scene from '../scene';

const Geometry = new THREE.BoxGeometry(10, 10, 10)

const Material = new THREE.MeshBasicMaterial({
  color: 0xff0000, // 红色
})

const COUNT = 100

const instanced = new THREE.InstancedMesh(Geometry, Material, COUNT);
instanced.frustumCulled = false;  // 保险：排除包围球误剔除，确保 100 个全画

const dummy = new THREE.Object3D();
for (let i = 0; i < COUNT; i++) {
  const col = i % 10, row = Math.floor(i / 10);
  dummy.position.set(col * 15 - 67.5, row * 15 - 67.5, 0); // 照抄 A 组摆位
  dummy.updateMatrix();
  instanced.setMatrixAt(i, dummy.matrix);   // 每个实例的 modelMatrix
}
instanced.instanceMatrix.needsUpdate = true;
Scene.add(instanced);

