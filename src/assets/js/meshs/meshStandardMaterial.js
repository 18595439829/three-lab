import * as THREE from 'three';
import scene from '../scene';
import renderer, { refreshRender } from '../render'

const COUNT = 3000;
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
