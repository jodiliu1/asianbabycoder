import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//this demo is accompilished with vanilla js (Chris Ferdinadi) , vite (Evan You) and three js (Ricardo Cabello)

// run "npm run dev" in terminal session to 


// a scene, a camera and a renderer are 3 essentials of setting up a 3d web
//set up part


//THREE.Scene is a container to hold the objects

const scene = new THREE.Scene();
 //
 //view from camera, perspective camera is the most common used camera which is designed as what human eyeballs would see
 //innerwidth = field of view // based on 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//render the 3d graphics for the page 
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio(window.devicePixelRatio);

//to make full screean canva by making rander size same to window size
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);//renderer set up 


//objects
// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);



//background star set up
// creat an addstar function to have stars as backgroud
//each star has a radius of 0.1

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1,0.2, 0.8, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// cube cube cube 

const neilTexture = new THREE.TextureLoader().load('images.jpeg');

const neil = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: neilTexture }));

scene.add(neil);

// planet added!

const planetTexture = new THREE.TextureLoader().load('planet.png');
//const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: planetTexture,
  
  })
);

scene.add(planet); //planet position set up

planet.position.z = 10;
planet.position.setX(-10);

neil.position.z = -5;
neil.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
//calculate where the audience is scorrling on the page


//when scroll down, the planet will slightly rotate
  planet.rotation.z += 0.05;

  neil.rotation.y += 0.01;
  neil.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
} 

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  neil.rotation.x += 0.01;
  neil.rotation.y += 0.005;
  neil.rotation.z += 0.01;

  planet.rotation.x += 0.005;



  // controls.update();

  renderer.render(scene, camera);
}

animate();


//this is the note part
//for future features
// mouse click events
/*
const tooltip = new (function() {
  const node = document.createElement('div');
  node.className = 'tooltip';
  node.setAttribute('hidden', '');
  document.body.appendChild(node);

  this.follow = function(event) {
    node.style.left = event.clientX + 20 + 'px';
    node.style.top = event.clientY + 10 + 'px';
  };

  this.show = function(event) {
    node.textContent = event.target.dataset.tooltip;
    node.removeAttribute('hidden');
  };

  this.hide = function() {
    node.setAttribute('hidden', '');
  };
})();

const links = document.querySelectorAll('a');

links.forEach(link => {
  link.onmouseover = tooltip.show;
  link.onmousemove = tooltip.follow;
  link.onmouseout = tooltip.hide;
});*/

