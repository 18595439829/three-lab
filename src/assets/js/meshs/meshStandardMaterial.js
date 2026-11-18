import * as THREE from 'three';
import scene from '@/assets/js/scene';
import Camera from '../camera';
import renderer, { refreshRender } from '@/assets/js/render'

const COUNT = 100;
const geo = new THREE.BoxGeometry(10, 10, 10);   // 沿用你的，camera 也沿用 (0,0,800)
const pos = Array.from({ length: COUNT }, () => [
  (Math.random() - 0.5) * 300,
  (Math.random() - 0.5) * 300,
  (Math.random() - 0.5) * 400,
]);

function build(transparent) {
  for (const o of [...scene.children]) if (o.isMesh) scene.remove(o);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x44aaff,
    transparent,
    opacity: transparent ? 0.5 : 1,
    ...(transparent ? { depthWrite: false } : {}),   // 让重叠片元全部参与 blend
  });
  for (let i = 0; i < COUNT; i++) {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(...pos[i]);
    m.frustumCulled = false;
    scene.add(m);
  }
}

const gl = renderer.getContext();
function measure(label) {
  return new Promise(resolve => {
    let n = 0, cpu = 0, t0 = 0;
    function tick() {
      t0 = performance.now();
      refreshRender()
      gl.finish();                       // 阻塞到 GPU 干完，把 GPU 时间算进来
      cpu += performance.now() - t0;
      if (++n < 60) return requestAnimationFrame(tick);
      console.log(label,
        '| 端到端 ms/帧:', (cpu / 60).toFixed(2),
        '| 60帧总 ms:', cpu.toFixed(1),
        '| calls:', renderer.info.render.calls);
      resolve();
    }
    requestAnimationFrame(tick);
  });
}

(async () => {
  build(false); await measure('①不透明');
  build(true);  await measure('②半透明');
})();

// ===== A 组：fov 实算 + project() 反验 =====
// 1) 复位：正对原点，且必须是透视相机
const camera = Camera.current
camera.position.set(0, 0, 800);
camera.lookAt(0, 0, 0);
if (typeof controls !== 'undefined') { controls.target.set(0, 0, 0); controls.update(); }
if (camera.isOrthographicCamera) console.warn('当前是正交相机，请切回透视再跑 A 组');
camera.updateMatrixWorld();
camera.updateProjectionMatrix();

// 2) 从相机真实参数算，不硬编码
const target = (typeof controls !== 'undefined') ? controls.target : new THREE.Vector3(0, 0, 0);
const dist   = camera.position.distanceTo(target);          // 800
const h      = 2 * dist * Math.tan(camera.fov * Math.PI / 360);  // ≈ 746.15
const half   = h / 2;                                       // ≈ 373.07
const ndcY   = (y) => new THREE.Vector3(0, y, 0).project(camera).y;

// 3) 打印
console.log('距离 dist       :', dist);
console.log('可见高度 h      :', h.toFixed(2), ' 半高 half:', half.toFixed(2));
console.log('顶边 y_ndc      :', ndcY(half).toFixed(4));      // ≈ 1.0000
console.log('中心 y_ndc      :', ndcY(0).toFixed(4));         // ≈ 0.0000
console.log('底边 y_ndc      :', ndcY(-half).toFixed(4));     // ≈ -1.0000
console.log('10单位盒子占屏高:', (10 / h * 100).toFixed(2) + '%');  // ≈ 1.34%
