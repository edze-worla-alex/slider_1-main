document.addEventListener("DOMContentLoaded", function () {
    const carouselDom = document.querySelector('.carousel');
    if (!carouselDom) return; // Exit if no carousel on page
  
    const nextDom = document.getElementById('next');
    const prevDom = document.getElementById('prev');
    const SliderDom = carouselDom.querySelector('.carousel .list');
    const thumbnailBorderDom = carouselDom.querySelector('.carousel .thumbnail');
  
    if (!nextDom || !prevDom || !SliderDom || !thumbnailBorderDom) return;
  
    let timeRunning = 5000;
    let timeAutoNext = 7000;
    let runTimeOut;
    let runNextAuto;
  
    const showSlider = (type) => {
      const SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
      const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
  
      if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
      } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
      }
  
      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
      }, timeRunning);
  
      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        showSlider('next');
      }, timeAutoNext);
    };
  
    // Initial auto start
    runNextAuto = setTimeout(() => {
      showSlider('next');
    }, timeAutoNext);
  
    nextDom.addEventListener('click', () => showSlider('next'));
    prevDom.addEventListener('click', () => showSlider('prev'));

    const handleThumbnailClick = () => {
      const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
      const sliderItemsDom = SliderDom.querySelectorAll('.item');
    
      thumbnailItemsDom.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
          const currentFirst = sliderItemsDom[0];
          const targetItem = sliderItemsDom[index];
    
          if (currentFirst === targetItem) return; // Already active
    
          // Animate to selected slide
          for (let i = 0; i < index; i++) {
            SliderDom.appendChild(SliderDom.querySelector('.item'));
            thumbnailBorderDom.appendChild(thumbnailBorderDom.querySelector('.item'));
          }
    
          carouselDom.classList.add('next');
    
          clearTimeout(runTimeOut);
          runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
          }, timeRunning);
    
          clearTimeout(runNextAuto);
          runNextAuto = setTimeout(() => {
            showSlider('next');
          }, timeAutoNext);
        });
      });
    };
    
    handleThumbnailClick();
  });