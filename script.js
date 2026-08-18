// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== Nav background on scroll + scroll-to-top button =====
const nav = document.getElementById('nav');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 40;
  nav.style.borderBottomColor = scrolled ? 'rgba(198,255,77,0.15)' : '';

  if (window.scrollY > 600) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// ===== Contact form =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  formNote.textContent = 'Sending your message...';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Form submission failed');

    formNote.textContent = 'Message sent successfully. Thank you!';
    contactForm.reset();
  } catch (error) {
    formNote.textContent = 'Message could not be sent. Please try again.';
  } finally {
    submitButton.disabled = false;
  }
});

// ===== Scroll-spy: highlight active nav link =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach(section => observer.observe(section));

// ===== Reveal-on-scroll for cards =====
const revealTargets = document.querySelectorAll('.project-card, .skill-card, .process-item, .edu-item');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ===== Projects carousel =====
const projectsGrid = document.querySelector('.projects-grid');
const projectsPrev = document.getElementById('projectsPrev');
const projectsNext = document.getElementById('projectsNext');

if (projectsGrid && projectsPrev && projectsNext) {
  const updateCarouselControls = () => {
    const maxScroll = projectsGrid.scrollWidth - projectsGrid.clientWidth;
    projectsPrev.disabled = projectsGrid.scrollLeft <= 4;
    projectsNext.disabled = projectsGrid.scrollLeft >= maxScroll - 4;
  };

  const moveProjects = (direction) => {
    const card = projectsGrid.querySelector('.project-card');
    const gap = parseFloat(getComputedStyle(projectsGrid).gap) || 0;
    const distance = card ? card.getBoundingClientRect().width + gap : projectsGrid.clientWidth;
    projectsGrid.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  projectsPrev.addEventListener('click', () => moveProjects(-1));
  projectsNext.addEventListener('click', () => moveProjects(1));
  projectsGrid.addEventListener('scroll', updateCarouselControls, { passive: true });
  window.addEventListener('resize', updateCarouselControls);
  updateCarouselControls();
}
