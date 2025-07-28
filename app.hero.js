class CircularHeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 4;
        this.progressFill = document.getElementById('progressFill');
        this.previewVideos = [];
        this.mainVideos = [];
        
        this.initSwiper();
        this.initPreviewWidgets();
        this.initializeVideos();
        this.initAnimations();
    }

    initSwiper() {
        this.swiper = new Swiper('.heroSwiper', {
            effect: 'creative',
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: ['-20%', 0, -1],
                    opacity: 0.5
                },
                next: {
                    translate: ['100%', 0, 0],
                    opacity: 0.3
                },
            },
            speed: 1200,
            autoplay: {
                delay: 9000,
                disableOnInteraction: false,
            },
            loop: true,
            navigation: {
                nextEl: '#nextBtn',
                prevEl: '#prevBtn',
            },
            on: {
                init: (swiper) => {
                    // Initial setup when swiper is ready
                    this.handleSlideChange(swiper);
                },
                slideChange: (swiper) => {
       
                    this.handleSlideChange(swiper);
                                 // Scale up the active slide's video
      
                },
                // slideChangeTransitionStart: (swiper) => {
                //     this.animateSlideContent(swiper);
                // }
                slideChangeTransitionEnd: (swiper) => {
                    this.animateSlideContent(swiper);
                },
                slideChangeTransitionStart: (swiper) => {
                    const bg = document.querySelector('.hero-slider');

                    
                    gsap.to(bg, {
                        filter: 'blur(8px)',
                        duration: 0.5,
                        ease: 'power2.inOut'
                    });
                    // gsap.to(".swiper-slide-active .slide-video", {
                    //     scale: 0.25,
                    //     duration: 1.2,
                    //     ease: "power3.inOut"
                    //   });
                    gsap.to(".slide-content", {
                        opacity: 0,
                        y: 30,
                        duration: 0.5,
                        ease: "power2.out"
                      });

                      // Animate circular previews on transition start
      gsap.to(".circular-previews .preview-circle.active", {
        scale: 0.5,
        opacity: 0.3,
        duration: 0.5,
        ease: "power2.inOut"
      });

      // Animate floating shapes out
      gsap.to(".floating-shape", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut"
      });
                },
                
                slideChangeTransitionEnd: (swiper) => {
                    document.querySelectorAll('.swiper-slide video').forEach(video => {
                        video.pause();
                      });
              
                      const activeSlide = document.querySelector('.swiper-slide-active');
                      const video = activeSlide.querySelector('video');
                      if (video) {
                        // Lazysizes may need a moment to load source
                        if (video.readyState >= 3) {
                          video.play();
                        } else {
                          video.addEventListener('canplay', () => video.play(), { once: true });
                        }
                      }
                    const bg = document.querySelector('.hero-slider');
                    gsap.to(bg, {
                        filter: 'blur(0px)',
                        duration: 0.5,
                        ease: 'power2.inOut'
                    });
                    gsap.fromTo(".slide-content", 
                        {opacity: 0, y: 30},
                        {
                          opacity: 1,
                          y: 0,
                          duration: 1,
                          ease: "power3.out"
                        }
                      );

                       // Animate circular previews back in
      gsap.to(".circular-preview .preview-circle.active", {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      });
    //   gsap.to('.slide-video', {
    //     scale: 1,
    //     duration: 1.2,
    //     ease: "power3.out"
    //   });

      // Floating shapes bounce in
      gsap.fromTo(".floating-shape",
        {y: 40, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1, 0.75)",
          stagger: 0.1
        }
      );
                    this.animateSlideContent(swiper);
                }
            }
        });
    }

    initPreviewWidgets() {
        const previewCircles = document.querySelectorAll('.preview-circle');
        previewCircles.forEach((circle, index) => {
            circle.addEventListener('click', () => {
                if (this.swiper && typeof this.swiper.slideToLoop === 'function') {
                    this.swiper.slideToLoop(index);
                }
            });
        });
    }

    initializeVideos() {
        // Initialize main slide videos
        this.mainVideos = document.querySelectorAll('.slide-video');
        this.mainVideos.forEach((video, index) => {
            video.addEventListener('loadeddata', () => {
                if (index === 0) {
                    video.play().catch(e => console.log('Video autoplay prevented'));
                }
            });
        });

    }

    handleSlideChange(swiper = null) {
        // Use passed swiper instance or fallback to this.swiper
        const swiperInstance = swiper || this.swiper;
        
        // Safety check to ensure swiper is initialized
        if (!swiperInstance || typeof swiperInstance.realIndex === 'undefined') {
            console.log('Swiper not ready yet');
            return;
        }
        
        const realIndex = swiperInstance.realIndex;
        this.currentSlide = realIndex;
        
        // Update progress bar
        const progressWidth = ((realIndex + 1) / this.totalSlides) * 100;
        this.progressFill.style.width = `${progressWidth}%`;
        
        // Update custom pagination
        const paginationDots = document.querySelectorAll('.pagination-dot');
        paginationDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
        
        // Update preview circles
        const previewCircles = document.querySelectorAll('.preview-circle');
        previewCircles.forEach((circle, index) => {
            circle.classList.toggle('active', index === realIndex);
        });
        
        // Handle video transitions
        this.handleVideoTransition(realIndex);
    }

    handleVideoTransition(activeIndex) {
        this.mainVideos.forEach((video, index) => {
            if (index === activeIndex) {
                video.currentTime = 0;
                video.play().catch(e => console.log('Video autoplay prevented'));
                
                // Enhanced video filter for active slide
                gsap.to(video, {
                    filter: 'brightness(0.6) contrast(1.2) saturate(1.1)',
                    duration: 0.8,
                    ease: "power2.inOut"
                });
            } else {
                // Dim inactive videos
                gsap.to(video, {
                    filter: 'brightness(0.3) contrast(1.2) saturate(0.8) blur(2px)',
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (index !== this.currentSlide) {
                            video.pause();
                        }
                    }
                });
            }
        });
    }

    animateSlideContent(swiper = null) {
        let activeSlide;
    
        if (swiper) {
            activeSlide = swiper.slides[swiper.activeIndex];
        } else {
            activeSlide = document.querySelector('.swiper-slide-active');
        }
    
        if (!activeSlide) return;
    
        const content = activeSlide.querySelector('.slide-content > div > div');
        const floatingShapes = activeSlide.querySelectorAll('.floating-shape');
        const previewCircles = document.querySelectorAll('.preview-circle');
    
        if (!content) return;
    
        const tl = gsap.timeline();
    
        // Animate floating shapes
        floatingShapes.forEach((shape, index) => {
            tl.fromTo(shape,
                {
                    opacity: 0,
                    scale: 0.3,
                    rotation: -90 + index * 45,
                    transformOrigin: 'center center'
                },
                {
                    opacity: 0.4,
                    scale: 1,
                    rotation: 0,
                    duration: 1.5,
                    ease: 'elastic.out(1, 0.4)'
                },
                0.2 + index * 0.1 // stagger into timeline
            );
        });
    
        // Animate preview circles (smoothly)
        tl.to(previewCircles, {
            opacity: 0.8,
            scale: 1,
            rotation: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            duration: 1,
        }, '<'); // sync with shapes
    
        // Animate slide content
        tl.fromTo(content.children,
            {
                opacity: 0,
                y: 60,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.2
            },
            '+=0.1' // start AFTER shapes/previews settle

        );
    }
    

    initAnimations() {
        // Initial slide animation
        setTimeout(() => {
            this.animateSlideContent();
        }, 500);

        // Add parallax effect for floating shapes
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            document.querySelectorAll('.floating-shape').forEach((shape, index) => {
                const speed = (index + 1) * 0.3;
                const x = mouseX * speed * 15;
                const y = mouseY * speed * 15;
                
                gsap.to(shape, {
                    duration: 1.5,
                    x: x,
                    y: y,
                    ease: "power2.out"
                });
            });
        });

        // Animate preview circles on load
        gsap.fromTo('.preview-circle', 
            { 
                scale: 0, 
                rotation: -180,
                opacity: 0
            },
            { 
                scale: 1, 
                rotation: 0,
                opacity: 0.7,
                duration: 1.2, 
                stagger: 0.2,
                ease: "elastic.out(1, 0.4)",
                delay: 1
            }
        );
    }

    // Public methods for external control
    goToSlide(index) {
        if (this.swiper && typeof this.swiper.slideToLoop === 'function') {
            this.swiper.slideToLoop(index);
        }
    }

    next() {
        if (this.swiper && typeof this.swiper.slideNext === 'function') {
            this.swiper.slideNext();
        }
    }

    prev() {
        if (this.swiper && typeof this.swiper.slidePrev === 'function') {
            this.swiper.slidePrev();
        }
    }

    pauseAutoplay() {
        if (this.swiper && this.swiper.autoplay && typeof this.swiper.autoplay.stop === 'function') {
            this.swiper.autoplay.stop();
        }
    }

    resumeAutoplay() {
        if (this.swiper && this.swiper.autoplay && typeof this.swiper.autoplay.start === 'function') {
            this.swiper.autoplay.start();
        }
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const lazyIframes = document.querySelectorAll("iframe[data-src]");

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          iframe.src = iframe.dataset.src;
          iframe.removeAttribute('data-src');
          obs.unobserve(iframe);
        }
      });
    });

    lazyIframes.forEach(iframe => observer.observe(iframe));
    const slider = new CircularHeroSlider();
    
    // Add hover pause functionality
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => slider.pauseAutoplay());
    heroSlider.addEventListener('mouseleave', () => slider.resumeAutoplay());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') slider.prev();
        if (e.key === 'ArrowRight') slider.next();
        if (e.key >= '1' && e.key <= '3') {
            slider.goToSlide(parseInt(e.key) - 1);
        }
    });

    // Custom pagination click handlers
    const paginationDots = document.querySelectorAll('.pagination-dot');
    paginationDots.forEach((dot, index) => {
        dot.addEventListener('click', () => slider.goToSlide(index));
    });
});

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Prevent context menu on videos for cleaner experience
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('contextmenu', e => e.preventDefault());
});

var input = document.querySelector("#phone");
window.intlTelInput(input, {
  separateDialCode: true
});

window.addEventListener('load', function () {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden'); // Hide the loading screen = 'none';
    document.body.classList.remove('overflow-hidden');
    const prose = document.querySelector('.app');
    if (prose) prose.style.display = 'block';
  }
});

