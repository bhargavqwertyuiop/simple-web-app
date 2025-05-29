// Smooth scroll & AOS initialization moved to HTML

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');
  hamburger.addEventListener('click', () => {
    navList.classList.toggle('open');
  });

  // Form validation
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      let valid = true;
      [name, email, message].forEach(field => { if (!field) valid = false; });
      const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
      if (!emailPattern.test(email)) valid = false;
      if (!valid) {
        alert('Please fill out all fields with valid information.');
      } else {
        alert('Thank you, your message has been sent!');
        form.reset();
      }
    });
  }
});