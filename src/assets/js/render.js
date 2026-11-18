import * as THREE from "three";
import Scene from "./scene.js";
import Camera from "./camera.js";
import AxesHelper from "./axes.js";
import initControls from './controls.js'
import Stats from './stats.js'


const Render = new THREE.WebGLRenderer({ antialias: true });
const dom = document.getElementById("app");

const controls = initControls(Camera, Render)

// 尺寸随容器变化
function resize() {
  const width = dom.clientWidth;
  const height = dom.clientHeight;
  Render.setSize(width, height);

  const camera = Camera.current;
  if (camera.isOrthographicCamera) {
    // 正投影：按宽高比重算左右范围，保持上下范围 s 不变
    const k = width / height;
    const s = 600;
    camera.left = -s * k;
    camera.right = s * k;
    camera.top = s;
    camera.bottom = -s;
  } else {
    // 透视：更新宽高比
    camera.aspect = width / height;
  }
  camera.updateProjectionMatrix();
}

resize();
window.addEventListener("resize", resize);

// 持续的渲染循环
function animate() {
  Stats.update();
  requestAnimationFrame(animate);

  // 相机切换后，把 controls 重新绑定到新相机
  const camera = Camera.current;
  if (controls.object !== camera) {
    controls.object = camera;
    controls.update();
  }

  Render.render(Scene, camera);
}

animate();

const refreshRender = () => {
  Render.render(Scene, Camera.current);
}

export {
  refreshRender
}

export default Render;
