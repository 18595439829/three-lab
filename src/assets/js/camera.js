import * as THREE from "three";
import Scene from "./scene";

// 创建默认相机（透视投影）
function createDefaultCamera() {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000,
  );
  camera.position.set(0, 0, 800);
  camera.lookAt(0, 0, 0);
  return camera;
}

// 相机管理器：持有「当前相机」，render / controls / gui 都通过它访问。
// 切换相机时只需更新 current，不必改动各处的 import。
const Camera = {
  current: createDefaultCamera(),

  // 切换当前相机：继承原相机的位置与朝向，避免切换后视角跳变
  set(next) {
    next.position.copy(this.current.position);
    next.quaternion.copy(this.current.quaternion);
    this.current = next;
    const helper = new THREE.CameraHelper(this.current);
    Scene.add(helper);
  },
};

export default Camera;
