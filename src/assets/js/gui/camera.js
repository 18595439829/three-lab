import * as THREE from "three";
import Camera from "../camera";

const PERSPECTIVE = "透视投影相机";
const ORTHOGRAPHIC = "正投影相机";

const init = (gui) => {
  const state = {
    type: Camera.current.isOrthographicCamera ? ORTHOGRAPHIC : PERSPECTIVE,
    fov: Camera.current.fov ?? 75, // fov 只属于透视相机
  };

  const cameraFolder = gui.addFolder("相机");
  let fovController; // 前置声明，供相机切换回调里 enable/disable

  cameraFolder
    .add(state, "type", [PERSPECTIVE, ORTHOGRAPHIC]).name("相机类型")
    .onChange((value) => {
      const k = window.innerWidth / window.innerHeight; // 宽高比
      const s = 600; // 控制正投影 left/right/top/bottom 的范围大小

      let next;
      if (value === ORTHOGRAPHIC) {
        next = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);
        fovController.disable(); // 正投影没有 fov，禁用滑条
      } else {
        next = new THREE.PerspectiveCamera(state.fov, k, 0.1, 5000);
        fovController.enable();
      }

      Camera.set(next);
    });

  fovController = cameraFolder
    .add(state, "fov", 60, 100).step(1).name("视角 fov")
    .onChange((value) => {
      // 只对透视相机有意义：把值写回「当前相机」并更新投影矩阵
      if (Camera.current.isPerspectiveCamera) {
        Camera.current.fov = value;
        Camera.current.updateProjectionMatrix();
      }
    });

  // 若默认就是正投影，初始就把 fov 滑条禁用
  if (Camera.current.isOrthographicCamera) fovController.disable();
};

export default init;
