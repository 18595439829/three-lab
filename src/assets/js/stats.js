//引入性能监视器stats.js
import Stats from 'three/addons/libs/stats.module.js';

//创建stats对象
const stats = new Stats();
//stats.domElement:web页面上输出计算结果,一个div元素，
document.body.appendChild(stats.domElement);

export default stats