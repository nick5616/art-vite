import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const lightSourcePosition = [5, 5, 5];
const spherePosition = [0, 0, 0];
const scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry(3, 64, 64);
const lightSphere = new THREE.SphereGeometry(1, 100, 100);

function midpoint(a, b) {
    const returnValues = [];
    for (let positionIndex = 0; positionIndex < a.length; positionIndex++) {
        returnValues.push((a[positionIndex] + b[positionIndex]) / 2);
    }
    console.log("return vals", returnValues);
    return returnValues;
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};
// lightSphere.material.opacity = 0.58;
// lightSphere.material.  = 0.58;
const lightMaterial = new THREE.MeshStandardMaterial({
    color: "#00ff00",
    opacity: 0.9,
    transparent: true,
    emissive: "#ff00ff",
    emissiveIntensity: 100,
});
const material = new THREE.MeshStandardMaterial({
    color: "#ffff83",
    opacity: 0.68,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(...spherePosition);
// const lightMesh = new THREE.Mesh(lightSphere, lightMaterial);
const midpointPosition = midpoint(lightSourcePosition, spherePosition);
console.log(midpointPosition);
// lightMesh.position.set(...midpointPosition);
// lightMesh.position.set([-2, 3, 1]);

scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 100, 10);
const light2 = new THREE.PointLight(0xff0000, 100, -10);
light2.position.set(0, 10, 20);
light.position.set(...lightSourcePosition);
scene.add(light, light2);

const camera = new THREE.PerspectiveCamera(
    30,
    sizes.width / sizes.height,
    0.1,
    100
);
for (const [char, index] of []);
camera.position.z = 20;
scene.add(camera);
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};
loop();

const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("mousemove", (e) => {
    if (mouseDown) {
        rgb = [
            Math.round((e.pageX, sizes.width) * 255),
            Math.round((e.pageY, sizes.height) * 255),
            150,
        ];
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        gsap.to(mesh.material.color, {
            r: newColor.r,
            g: newColor.g,
            b: newColor.b,
        });
    }
});
