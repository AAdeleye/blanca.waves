// ── Video Carousel (manual only) ──────────────────────────────────────────────
const videoTrack = document.querySelector('.video-carousel-track');
const videoItems = document.querySelectorAll('.video-carousel-item');
let videoIndex = 0;

function goToVideo(index) {
    videoIndex = (index + videoItems.length) % videoItems.length;
    // pause the video that's scrolling away
    videoItems.forEach(item => item.querySelector('video').pause());
    videoTrack.style.transform = `translateX(-${videoIndex * 100}%)`;
}

document.querySelector('.video-prev-btn')?.addEventListener('click', () => goToVideo(videoIndex - 1));
document.querySelector('.video-next-btn')?.addEventListener('click', () => goToVideo(videoIndex + 1));


// ── Photo Carousel (auto-scroll) ──────────────────────────────────────────────
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn-prev');
const nextBtn = document.querySelector('.carousel-btn-next');
let currentIndex = 0;
let autoScrollInterval;

function getItemWidth() {
    if (!items.length) return 0;
    return items[0].offsetWidth + 24; // 24px = 1.5rem gap
}

function isMobile() { return window.innerWidth <= 768; }
function visibleCount() { return isMobile() ? 1 : 3; }

function goTo(index) {
    const max = items.length - visibleCount();
    currentIndex = Math.max(0, Math.min(index, max));
    track.style.transform = `translateX(-${currentIndex * getItemWidth()}px)`;
}

function next() {
    const max = items.length - visibleCount();
    goTo(currentIndex >= max ? 0 : currentIndex + 1);
}

function prev() {
    const max = items.length - visibleCount();
    goTo(currentIndex <= 0 ? max : currentIndex - 1);
}

function startAutoScroll() { autoScrollInterval = setInterval(next, 3500); }
function stopAutoScroll() { clearInterval(autoScrollInterval); }

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { stopAutoScroll(); prev(); startAutoScroll(); });
    nextBtn.addEventListener('click', () => { stopAutoScroll(); next(); startAutoScroll(); });
    startAutoScroll();
}


// ── Lightbox ──────────────────────────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const allImgs = Array.from(document.querySelectorAll('.carousel-item img'));
let lightboxIndex = 0;

document.querySelectorAll('.carousel-item').forEach((item, i) => {
    item.addEventListener('click', () => {
        lightboxIndex = i;
        lightboxImg.src = allImgs[i].src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    lightboxIndex = (lightboxIndex + direction + allImgs.length) % allImgs.length;
    lightboxImg.src = allImgs[lightboxIndex].src;
}

lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
});
