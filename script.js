const boxes = document.querySelectorAll('.pricing-boxes');

function createObserverForBoxes(boxes, label) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('not-hidden');
				} else {
					entry.target.classList.remove('not-hidden');
				}
			});
		},
		{
			threshold: 0,
			rootMargin: '-50px',
		}
	);

	boxes.forEach((box) => observer.observe(box));
}

createObserverForBoxes(boxes, 'Pricing-Boxes');

const galleryItems = document.querySelectorAll('.gallery-item');

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
			} else {
				entry.target.classList.remove('visible');
			}
		});
	},
	{
		threshold: 0,
	}
);

galleryItems.forEach((item) => {
	observer.observe(item);
});

const galleryItemsLightbox = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeButton = document.querySelector('.close');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const imageCounter = document.getElementById('image-counter');
const body = document.body;

let currentImageIndex = 0;

function openLightbox(index) {
	if (window.innerWidth > 1024) {
		lightbox.style.display = 'flex';
		lightboxImg.src = galleryItemsLightbox[index].src;
		currentImageIndex = index;
		body.classList.add('no-scroll');
		updateCounter();
	}
}

function closeLightbox() {
	lightbox.style.display = 'none';
	body.classList.remove('no-scroll');
}

function showPrev() {
	currentImageIndex =
		currentImageIndex > 0
			? currentImageIndex - 1
			: galleryItemsLightbox.length - 1;
	lightboxImg.src = galleryItemsLightbox[currentImageIndex].src;
	updateCounter();
}

function showNext() {
	currentImageIndex =
		currentImageIndex < galleryItemsLightbox.length - 1
			? currentImageIndex + 1
			: 0;
	lightboxImg.src = galleryItemsLightbox[currentImageIndex].src;
	updateCounter();
}

function updateCounter() {
	imageCounter.textContent = `Image ${currentImageIndex + 1} of ${
		galleryItems.length
	}`;
}

galleryItemsLightbox.forEach((item, index) => {
	item.addEventListener('click', () => openLightbox(index));
});

closeButton.addEventListener('click', closeLightbox);
prevButton.addEventListener('click', showPrev);
nextButton.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
	if (e.target === lightbox || e.target === lightboxImg) {
		closeLightbox();
	}
});

const backTopButton = document.querySelector('.back-top');

function toggleBackTop() {
	const scrollPercentage =
		(window.scrollY + window.innerHeight) /
		document.documentElement.scrollHeight;

	if (scrollPercentage > 0.6) {
		backTopButton.classList.add('show');
	} else {
		backTopButton.classList.remove('show');
	}
}

window.addEventListener('scroll', toggleBackTop);

backTopButton.addEventListener('click', (e) => {
	e.preventDefault();
	window.scrollTo({ top: 0, behavior: 'smooth' });
});

const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('is-active');
	mobileNav.classList.toggle('is-active');
});

mobileNav.addEventListener('click', () => {
	hamburger.classList.remove('is-active');
	mobileNav.classList.remove('is-active');
});
