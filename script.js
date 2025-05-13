AOS.init();

// Set the date for the countdown (change to your wedding date)
const weddingDate = new Date("August 23, 2025 08:00:00").getTime();

// Get the countdown element to display the time remaining
const countdownElement = document.getElementById("countdown");

// Update the countdown every 1 second
const interval = setInterval(() => {
    // Get the current time
    const now = new Date().getTime();
    
    // Calculate the distance between now and the wedding date
    const distance = weddingDate - now;
    
    // If the countdown has finished, display a message
    if (distance < 0) {
        clearInterval(interval);
        countdownElement.innerHTML = "The Big Day is Here!";
    } else {
        // Calculate the time remaining in days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the countdown display
        countdownElement.innerHTML = `Countdown to our special day: <br> ${days}days, ${hours}hr, ${minutes}min, ${seconds}sec`;
    }
}, 1000);

document.addEventListener('DOMContentLoaded', function() {
    const fadeLines = document.querySelectorAll('.fade-line');
    
    // Initialize all lines as transparent
    fadeLines.forEach(line => {
        line.style.opacity = '0';
    });
    
    function checkVisibility() {
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        fadeLines.forEach(line => {
            const lineTop = line.getBoundingClientRect().top + windowTop;
            const lineBottom = lineTop + line.offsetHeight;
            
            // Check if the line is within the visible area of the window
            if (lineBottom < windowBottom && lineTop > windowTop) {
                // Line is completely visible, fade it in
                line.style.opacity = '1';
            } else {
                // Line is not completely visible, fade it out
                line.style.opacity = '0';
            }
        });
    }
    
    // Run on load and on scroll
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
    
    // Initial check
    checkVisibility();
});

document.addEventListener('DOMContentLoaded', function () {
    const quoteSection = document.getElementById('quote-section');
    
    function checkScroll() {
        const rect = quoteSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
            quoteSection.classList.add('visible');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
});

document.querySelectorAll('[data-aos="fade"]').forEach(el => {
    el.setAttribute('data-aos-duration', '2000');
    el.setAttribute('data-aos-delay', '300');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-underline');
    } else {
      entry.target.classList.remove('animate-underline');
    }
  });
});

document.querySelectorAll('.big-day-text').forEach(el => observer.observe(el));

const track = document.getElementById('carouselTrack');
let x = 0;
const speed = 0.5; // lower = slower

function animate() {
  const trackWidth = track.scrollWidth;
  const containerWidth = track.parentElement.offsetWidth;
  
  x -= speed;
  if (Math.abs(x) >= (trackWidth - containerWidth)) {
    x = 0; // reset to beginning
  }
  
  track.style.transform = `translateX(${x}px)`;
  requestAnimationFrame(animate);
}

animate();

const weddingMusic = new Howl({
  src: ['https://www.bensound.com/bensound-music/bensound-romantic.mp3'], // Replace with your MP3 URL
  autoplay: true,
  loop: true,
  volume: 0.5
});

// Get the play/mute button and icon elements
const soundButton = document.getElementById('soundButton');
const soundIcon = document.getElementById('soundIcon');

// Flag to track if sound is muted or playing
let isMuted = false;

// Toggle play and mute functionality when the button is clicked
soundButton.addEventListener('click', function() {
    if (isMuted) {
        weddingMusic.play(); // Play sound if it's muted
        soundIcon.classList.remove('fa-volume-mute');
        soundIcon.classList.add('fa-volume-up');
    } else {
        weddingMusic.pause(); // Mute sound if it's playing
        soundIcon.classList.remove('fa-volume-up');
        soundIcon.classList.add('fa-volume-mute');
    }
    isMuted = !isMuted;
});