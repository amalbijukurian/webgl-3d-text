import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import font from './static/fonts/helvetiker_regular.typeface.json'
import matcapImage from './static/textures/1.png'

const scene=new THREE.Scene()

const textureLoader=new THREE.TextureLoader()
const matcapTex=textureLoader.load(matcapImage) 

const fontLoader = new FontLoader();
const loadedfont=fontLoader.parse(font)
const textgeometry=new TextGeometry(
  'Amal Biju',{
  font: loadedfont,
  size: 0.5,
  height: 0.2,
  depth: 0.2,
  curveSegments: 6,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.02,
  bevelOffset:0,
  bevelSegments: 4
      }
    )
  textgeometry.center()
  const material=new THREE.MeshMatcapMaterial()
  material.matcap=matcapTex
  const text=new THREE.Mesh(textgeometry,material)
  scene.add(text)
  // textmaterial.wireframe=true

  console.time('torus')
const torusgeometry=new THREE.TorusGeometry(0.3,0.2,20,45)
for (let i = 0; i < 100; i++) {
  const torus=new THREE.Mesh(torusgeometry,material)
  torus.position.x=(Math.random()-0.5)*10
  torus.position.y=(Math.random()-0.5)*10
  torus.position.z=(Math.random()-0.5)*10

  
  torus.rotation.x=Math.random()*Math.PI
  torus.rotation.y=Math.random()*Math.PI

  const scale=Math.random()
  torus.scale.set(scale,scale,scale)

  scene.add(torus)
}
console.timeEnd('torus')
  




const sizes={
  width:window.innerWidth,
  height:window.innerHeight
}

window.addEventListener('resize',()=>{
  sizes.width=window.innerWidth
  sizes.height=window.innerHeight
  camera.aspect=sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
camera.position.set(0,0,3)
scene.add(camera)


const canvas=document.querySelector('canvas.webgl')

const controls= new OrbitControls(camera,canvas)
controls.enableDamping=true

const renderer=new THREE.WebGLRenderer({
  canvas:canvas
})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))


const tick=()=>{
  renderer.render(scene,camera)
  controls.update()
  window.requestAnimationFrame(tick)
}
tick()