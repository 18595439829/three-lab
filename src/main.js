import './style.css'
import Render from './assets/js/render'
import "@/assets/js/meshs/mesh.js";
import '@/assets/js/gui/gui'
const Canvas = Render.domElement

document.querySelector('#app').appendChild(Canvas)
