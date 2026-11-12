import * as THREE from "three";
import Scene from "./scene.js";
import Camera from "./camera.js";
import AxesHelper from "./axes.js";

Scene.add(AxesHelper)

const Render = new THREE.WebGLRenderer({ antialias: true });
const dom = document.getElementById("app");

// 尺寸随容器变化
function resize() {
  const width = dom.clientWidth;
  const height = dom.clientHeight;
  Render.setSize(width, height);
  Camera.aspect = width / height;
  Camera.updateProjectionMatrix();
}

resize();
window.addEventListener("resize", resize);

// 持续的渲染循环
function animate() {
  requestAnimationFrame(animate);
//   console.log(
//     "calls:",
//     Render.info.render.calls,
//     "triangles:",
//     Render.info.render.triangles,
//   );
  Render.render(Scene, Camera);
}

// animate();

const refreshRender = () => {
    Render.render(Scene, Camera);
}

export {
    refreshRender
}

export default Render;
