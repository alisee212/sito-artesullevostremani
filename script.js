document.addEventListener('DOMContentLoaded', () => {

  // Standard Carousel for Price List
  function setupStandardCarousel(containerId, prevId, nextId, dotsContainerId) {
    const container = document.getElementById(containerId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const dotsContainer = document.getElementById(dotsContainerId);

    if (!container) return;

    const getCardWidth = () => {
      const firstCard = container.querySelector('.pricelist-card');
      return firstCard ? firstCard.offsetWidth + 20 : 300;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
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

      container.addEventListener('scroll', () => {
        const scrollPosition = container.scrollLeft;
        const activeIndex = Math.round(scrollPosition / getCardWidth());
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === activeIndex);
        });
      });
    }
  }

  // Circular Infinite Carousel for Lavori (Last photo loops back to First photo)
  function setupCircularCarousel(containerId, prevId, nextId, dotsContainerId) {
    const container = document.getElementById(containerId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const dotsContainer = document.getElementById(dotsContainerId);

    if (!container) return;

    const cards = container.querySelectorAll('.showroom-card');
    const totalCards = cards.length;

    const getCardWidth = () => {
      const firstCard = container.querySelector('.showroom-card');
      return firstCard ? firstCard.offsetWidth + 20 : 270;
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
        
        // If at or near the last photo, loop circular back to the first photo
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
        
        // If at or near the first photo, loop circular to the last photo
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

  // Initialize Carousels
  setupStandardCarousel('pricelist-container', 'price-prev', 'price-next', 'carousel-dots');
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
