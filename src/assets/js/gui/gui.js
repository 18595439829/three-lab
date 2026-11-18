import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import initCamera from './camera'

const gui = new GUI(); //创建GUI对象 

document.getElementById('app').appendChild(gui.domElement)

initCamera(gui)