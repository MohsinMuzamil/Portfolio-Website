import * as THREE from 'three';
// (All previous Three.js setup remains the same)

// --- Scene Setup ---
// (No changes here, the 3D scene code is the same)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
const container = document.getElementById('canvas-container');
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
const geometry = new THREE.IcosahedronGeometry(2, 20);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.2, wireframe: true });
const blob = new THREE.Mesh(geometry, material);
scene.add(blob);
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x00ffff, 30, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
const pointLight2 = new THREE.PointLight(0xff00ff, 30, 100);
pointLight2.position.set(-5, -5, -5);
scene.add(pointLight2);

let mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// --- Horizontal Scroll Logic ---
// (No changes here, horizontal scroll logic is the same)
const aboutSection = document.querySelector('.about-section-horizontal');
const horizontalPanels = document.querySelector('.horizontal-panels');
window.addEventListener('scroll', () => {
    if(aboutSection && horizontalPanels) {
        const { top, height } = aboutSection.getBoundingClientRect();
        const scrollableHeight = height - window.innerHeight;
        if (top <= 0 && top >= -scrollableHeight) {
            const progress = -top / scrollableHeight;
            const transformX = progress * (horizontalPanels.scrollWidth - window.innerWidth);
            horizontalPanels.style.transform = `translateX(-${transformX}px)`;
        }
    }
});


// --- Magnetic Link Logic using GSAP ---
const magneticLink = document.querySelector('.magnetic-link');
const linkText = document.querySelector('.link-text');

magneticLink.addEventListener('mousemove', function(e) {
    const rect = magneticLink.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Use GSAP to animate
    gsap.to(magneticLink, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.8,
        ease: "power4.out"
    });
    gsap.to(linkText, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.8,
        ease: "power4.out"
    });
});

magneticLink.addEventListener('mouseleave', function() {
    // Animate back to original position
    gsap.to(magneticLink, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
    });
    gsap.to(linkText, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
    });
});


// --- Animation Loop ---
// (No changes here, the animation loop is the same)
const clock = new THREE.Clock();
let currentScroll = 0;
window.addEventListener('scroll', () => { currentScroll = window.scrollY; });
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    blob.rotation.y = elapsedTime * 0.2;
    blob.rotation.x = elapsedTime * 0.1;
    blob.rotation.z = currentScroll * 0.002;
    pointLight.position.x = Math.sin(elapsedTime * 0.5) * 5;
    pointLight.position.z = Math.cos(elapsedTime * 0.5) * 5;
    camera.position.x += (mouse.x - camera.position.x) * 0.05;
    camera.position.y += (mouse.y - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
animate();