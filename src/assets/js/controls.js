import { MapControls } from 'three/addons/controls/MapControls.js';

const initControls = (cameraManager, renderer) => {
  // 绑定「当前相机」；相机切换后由 render.js 同步 controls.object
  const controls = new MapControls(cameraManager.current, renderer.domElement);
  return controls;
}

export default initControls
