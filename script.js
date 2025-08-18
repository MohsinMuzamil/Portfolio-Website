
// Typing effect for hero section
const text = "Web Developer | HTML, CSS, JavaScript";
let index = 0;
function type() {
  document.querySelector('.typing-effect').textContent = text.slice(0, index);
  index++;
  if (index <= text.length) {
    setTimeout(type, 100);
  }
}
type();

// Smooth scrolling for nav links
document.querySelectorAll('.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Contact form validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  if (name && email && message) {
    alert('Form submitted successfully! (Demo alert)');
    this.reset();
  } else {
    alert('Please fill out all fields.');
  }
});