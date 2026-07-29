// Disable automatic browser scroll restoration on refresh and force scroll to top (0,0)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

  // Force scroll to top on DOMReady
  window.scrollTo(0, 0);

  // Statistics Intersection Observer & Count-Up Animation
  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statCards = statsSection.querySelectorAll('.stat-card');
    let animated = false;

    const animateCountUp = (el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const duration = 1600; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const currentValue = easeProgress * target;

        if (decimals > 0) {
          const formatted = currentValue.toFixed(decimals).replace('.', ',');
          el.textContent = `${formatted}${suffix}`;
        } else {
          const formatted = Math.floor(currentValue);
          el.textContent = `${formatted}${suffix}`;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          if (decimals > 0) {
            el.textContent = `${target.toFixed(decimals).replace('.', ',')}${suffix}`;
          } else {
            el.textContent = `${target}${suffix}`;
          }
        }
      };

      requestAnimationFrame(updateCount);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statCards.forEach((card) => {
            const delay = parseInt(card.getAttribute('data-delay') || '0', 10);
            setTimeout(() => {
              card.classList.add('visible');
              const numEl = card.querySelector('.stat-number');
              if (numEl) animateCountUp(numEl);
            }, delay);
          });
        }
      });
    }, { threshold: 0.15 });

    observer.observe(statsSection);
  }

  // Circular Infinite Carousel Engine for Lavori & Price List
  function setupCircularCarousel(containerId, prevId, nextId, dotsContainerId) {
    const container = document.getElementById(containerId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const dotsContainer = document.getElementById(dotsContainerId);

    if (!container) return;

    const cards = container.querySelectorAll('.showroom-card, .pricelist-card');
    const totalCards = cards.length;

    const getCardWidth = () => {
      const firstCard = container.querySelector('.showroom-card, .pricelist-card');
      return firstCard ? firstCard.offsetWidth + 20 : 280;
    };

    const updateActiveDot = (index) => {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
      });
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScrollLeft - 15) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        
        if (container.scrollLeft <= 15) {
          container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
      });
    }

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const index = parseInt(dot.getAttribute('data-index'), 10);
          container.scrollTo({ left: index * getCardWidth(), behavior: 'smooth' });
        });
      });
    }

    container.addEventListener('scroll', () => {
      const scrollPosition = container.scrollLeft;
      const cardWidth = getCardWidth();
      let activeIndex = Math.round(scrollPosition / cardWidth);
      if (activeIndex >= totalCards) activeIndex = totalCards - 1;
      updateActiveDot(activeIndex);
    });
  }

  // Initialize both Lavori and Price List as Circular Infinite Carousels
  setupCircularCarousel('pricelist-container', 'price-prev', 'price-next', 'carousel-dots');
  setupCircularCarousel('lavori-container', 'lavori-prev', 'lavori-next', 'lavori-dots');

  // Back to Top Floating Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

});
