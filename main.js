/* ==========================================================================
   GAURAV RAJEEV RAI - PORTFOLIO INTERACTIVE SCRIPT
   Theme: Luxury Black & Metallic Gold Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. SCROLL PROGRESS BAR & NAVBAR & BACK-TO-TOP BUTTON
     -------------------------------------------------------------------------- */
  const scrollProgress = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const yearCopy = document.getElementById('year-copy');
  const backToTopBtn = document.getElementById('back-to-top');

  if (yearCopy) {
    yearCopy.textContent = new Date().getFullYear();
  }

  window.addEventListener('scroll', () => {
    // Scroll progress bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    // Navbar scrolled state
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (window.pageYOffset > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. REVEAL ON SCROLL OBSERVER
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------------------------------
     3. HERO DESIGNATION DYNAMIC TYPING EFFECT
     -------------------------------------------------------------------------- */
  const typingTextEl = document.getElementById('typing-text');
  if (typingTextEl) {
    const titles = [
      "Business Analytics Enthusiast",
      "Data-Driven Problem Solver",
      "SQL & Advanced Excel Specialist",
      "PGDM Scholar @ UKS Institute",
      "B.Sc. Computer Science Graduate"
    ];
    let titleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    const typeEffect = () => {
      const currentTitle = titles[titleIdx];

      if (isDeleting) {
        typingTextEl.textContent = currentTitle.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 40;
      } else {
        typingTextEl.textContent = currentTitle.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIdx === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2200; // Pause at full text
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        typingSpeed = 400; // Pause before typing next
      }

      setTimeout(typeEffect, typingSpeed);
    };

    setTimeout(typeEffect, 600);
  }

  /* --------------------------------------------------------------------------
     4. HERO INTERACTIVE GOLDEN CONSTELLATION & SPARKLE CANVAS
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('hero-particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;

    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    });

    const parentSec = canvas.parentElement;
    parentSec.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    parentSec.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    const particles = [];
    const numParticles = Math.min(Math.floor(width / 20), 55);

    const goldPalette = [
      'rgba(212, 175, 55, 0.7)',  // Royal Metallic Gold
      'rgba(255, 215, 0, 0.8)',   // Bright Gold
      'rgba(255, 245, 194, 0.9)', // Champagne Light Sparkle
      'rgba(170, 119, 28, 0.5)'   // Deep Bronze Gold
    ];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1.2,
        color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
        pulse: Math.random() * Math.PI
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        p.pulse += 0.03;
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.5;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;
          }
        }

        // Draw particle node with golden shadow glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();

        // Connect close particles with delicate golden lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.32 * (1 - dist / 135)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect particle to mouse cursor if near
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 215, 0, ${0.45 * (1 - mdist / 140)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    };

    drawParticles();
  }

  /* --------------------------------------------------------------------------
     5. INTERSECTION OBSERVER FOR ACTIVE NAV HIGHLIGHTING
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => navObserver.observe(sec));

  /* --------------------------------------------------------------------------
     6. PROJECT FILTERING TABS
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          card.classList.remove('fade-in-anim');

          if (filterValue === 'all' || category === filterValue) {
            card.classList.remove('hide');
            setTimeout(() => {
              card.classList.add('fade-in-anim');
            }, 20);
          } else {
            card.classList.add('hide');
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. SKILLS PROGRESS BARS & COUNT-UP ANIMATION
     -------------------------------------------------------------------------- */
  const skillsSection = document.getElementById('skills');
  let animatedSkills = false;

  const animateSkills = () => {
    const progressFills = document.querySelectorAll('.progress-fill');
    const skillVals = document.querySelectorAll('.skill-val');

    progressFills.forEach(fill => {
      const targetPercent = fill.getAttribute('data-percent');
      fill.style.width = `${targetPercent}%`;
    });

    skillVals.forEach(val => {
      const targetNum = parseInt(val.getAttribute('data-target'), 10);
      let currentNum = 0;
      const stepTime = 15;
      const increment = Math.ceil(targetNum / (1000 / stepTime));

      const timer = setInterval(() => {
        currentNum += increment;
        if (currentNum >= targetNum) {
          currentNum = targetNum;
          clearInterval(timer);
        }
        val.textContent = `${currentNum}%`;
      }, stepTime);
    });
  };

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedSkills) {
          animateSkills();
          animatedSkills = true;
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }

  /* --------------------------------------------------------------------------
     8. STAT COUNTERS COUNT-UP ANIMATION
     -------------------------------------------------------------------------- */
  const achievementsSection = document.getElementById('achievements');
  let animatedStats = false;

  const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      let current = 0;
      const duration = 1500;
      const steps = 40;
      const stepDuration = duration / steps;
      const increment = target / steps;

      const counterTimer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(counterTimer);
        }
        stat.textContent = Math.floor(current);
      }, stepDuration);
    });
  };

  if (achievementsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animateStats();
          animatedStats = true;
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(achievementsSection);
  }

  /* --------------------------------------------------------------------------
     9. CERTIFICATE & PROJECT CARDS MOUSE 3D TILT EFFECT & LIGHTBOX MODAL
     -------------------------------------------------------------------------- */
  const tiltableCards = document.querySelectorAll('.cert-card, .project-card, .exp-card, .achievement-card');
  const certCards = document.querySelectorAll('.cert-card');
  const certModal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-cert-img');
  const modalTitle = document.getElementById('modal-cert-title');
  const modalClose = document.getElementById('modal-close');

  tiltableCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');

      if (imgSrc && certModal && modalImg && modalTitle) {
        modalImg.src = imgSrc;
        modalTitle.textContent = title || 'Certificate';
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (certModal) {
      certModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* --------------------------------------------------------------------------
     10. CONTACT FORM FEEDBACK
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const fullname = document.getElementById('fullname').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!fullname || !email || !subject || !message) {
        e.preventDefault();
        alert('Please fill out all form fields before sending.');
        return;
      }

      const sendBtn = contactForm.querySelector('.btn-send span');
      if (sendBtn) {
        sendBtn.textContent = 'Opening Mail Client...';
      }
    });
  }

});
