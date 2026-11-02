/*
  CONFIGURAÇÃO DOS LINKS
  1. Troque o número do WhatsApp pelo seu, com código do Brasil (55) + DDD + número.
     Use apenas números, sem espaços, parênteses ou traços.
  2. Cole os links completos do Instagram e TikTok.
*/
const CONFIG = {
  whatsappNumber: "5571988395922",
  whatsappMessage: "Olá! Gostaria de solicitar um orçamento.",
  instagramUrl: "https://www.instagram.com/luccas_fotografo/",
  tiktokUrl: "https://www.tiktok.com/@lucaxfit"
};

const whatsappReady = /^55\d{10,11}$/.test(CONFIG.whatsappNumber);
const whatsappUrl = whatsappReady
  ? `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`
  : "#";

function setLink(id, url, isReady = true) {
  const element = document.getElementById(id);
  if (!element) return;
  element.href = url;
  if (!isReady) {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Antes de publicar, configure este link no arquivo script.js.");
    });
  }
}

[
  "whatsapp-link",
  "portfolio-whatsapp",
  "bottom-whatsapp",
  "footer-whatsapp-link"
].forEach(id => setLink(id, whatsappUrl, whatsappReady));

const instagramReady = !CONFIG.instagramUrl.includes("SEU_USUARIO");
const tiktokReady = !CONFIG.tiktokUrl.includes("SEU_USUARIO");
setLink("instagram-link", CONFIG.instagramUrl, instagramReady);
["tiktok-link", "footer-tiktok-link"].forEach(id => setLink(id, CONFIG.tiktokUrl, tiktokReady));

document.getElementById("year").textContent = new Date().getFullYear();

// Só exibe fotos que realmente existam. Assim, a galeria não fica cheia de imagens quebradas.
const photoCards = [...document.querySelectorAll("[data-photo]")];
let loadedPhotos = 0;
let settledPhotos = 0;
const emptyGallery = document.getElementById("empty-gallery");
const albumPhotoCount = document.getElementById("album-photo-count");
const photoLightbox = document.getElementById("photo-lightbox");
const photoLightboxImage = document.getElementById("photo-lightbox-image");
const photoLightboxDate = document.getElementById("photo-lightbox-date");
const photoLightboxCounter = document.getElementById("photo-lightbox-counter");
const closePhotoLightbox = photoLightbox?.querySelector(".photo-lightbox-close");
const previousPhotoButton = photoLightbox?.querySelector(".photo-lightbox-previous");
const nextPhotoButton = photoLightbox?.querySelector(".photo-lightbox-next");
let lastScrollPosition = window.scrollY;
let scrollDirection = 1;

window.addEventListener("scroll", () => {
  const currentScrollPosition = window.scrollY;
  if (currentScrollPosition !== lastScrollPosition) {
    scrollDirection = currentScrollPosition > lastScrollPosition ? 1 : -1;
    lastScrollPosition = currentScrollPosition;
  }
}, { passive: true });

const photoRevealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.toggle("is-returning", scrollDirection < 0);
        entry.target.classList.add("is-revealed");
      } else {
        entry.target.classList.remove("is-revealed", "is-returning");
      }
    });
  }, { threshold: 0.12 })
  : null;
let photoLightboxRequest = 0;
let currentPhotoCard = null;

function getAvailablePhotos() {
  return photoCards.filter(card =>
    card.isConnected && card.classList.contains("is-visible") &&
    card.querySelector("img").naturalWidth > 0
  );
}

function updatePhotoNavigation() {
  const availablePhotos = getAvailablePhotos();
  const hasMultiplePhotos = availablePhotos.length > 1;
  previousPhotoButton.disabled = !hasMultiplePhotos;
  nextPhotoButton.disabled = !hasMultiplePhotos;
  const currentIndex = availablePhotos.indexOf(currentPhotoCard);
  photoLightboxCounter.textContent = currentIndex < 0
    ? ""
    : `${String(currentIndex + 1).padStart(2, "0")} / ${String(availablePhotos.length).padStart(2, "0")}`;
}

function updateAlbumPhotoCount() {
  if (!albumPhotoCount || settledPhotos !== photoCards.length) return;
  const photoLabel = loadedPhotos === 1 ? "fotografia" : "fotografias";
  albumPhotoCount.textContent = `${loadedPhotos} ${photoLabel}`;
}

async function showPhotoInLightbox(card) {
  currentPhotoCard = card;
  updatePhotoNavigation();
  const image = card.querySelector("img");
  const [year, month, day] = card.dataset.date.split("-");
  photoLightboxDate.dateTime = card.dataset.date;
  photoLightboxDate.textContent = `${day}/${month}/${year}`;
  const request = ++photoLightboxRequest;
  const source = image.dataset.fullSrc || image.currentSrc || image.src;
  photoLightbox.classList.remove("is-error");
  photoLightbox.classList.add("is-loading");
  photoLightboxImage.removeAttribute("src");
  photoLightboxImage.alt = image.alt;
  if (!photoLightbox.open) photoLightbox.showModal();

  photoLightboxImage.src = source;
  try {
    await photoLightboxImage.decode();
    if (request === photoLightboxRequest) {
      photoLightbox.classList.remove("is-loading");
    }
  } catch (error) {
    if (request === photoLightboxRequest) {
      photoLightbox.classList.remove("is-loading");
      photoLightbox.classList.add("is-error");
      console.error("Não foi possível carregar a foto ampliada.", error);
    }
  }
}

function moveLightboxPhoto(direction) {
  const availableCards = getAvailablePhotos();
  const currentIndex = availableCards.indexOf(currentPhotoCard);
  if (currentIndex === -1 || availableCards.length < 2) return;

  const nextIndex = (currentIndex + direction + availableCards.length) % availableCards.length;
  showPhotoInLightbox(availableCards[nextIndex]);
}

photoCards.forEach(card => {
  card.querySelector(".gallery-photo-button").addEventListener("click", () => showPhotoInLightbox(card));
});

if (photoLightbox) {
  closePhotoLightbox.addEventListener("click", () => photoLightbox.close());
  previousPhotoButton.addEventListener("click", () => moveLightboxPhoto(-1));
  nextPhotoButton.addEventListener("click", () => moveLightboxPhoto(1));
}
document.addEventListener("keydown", event => {
  if (!photoLightbox?.open) return;

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveLightboxPhoto(-1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    moveLightboxPhoto(1);
  } else if (event.key === "Escape") {
    event.preventDefault();
    photoLightbox.close();
  }
});
if (photoLightbox) {
  photoLightbox.addEventListener("click", event => {
    if (event.target === photoLightbox) photoLightbox.close();
  });
}

photoCards.forEach(card => {
  const image = card.querySelector("img");
  const showPhoto = () => {
    if (card.classList.contains("is-visible")) return;
    card.classList.add("is-visible");
    loadedPhotos++;
    settledPhotos++;
    emptyGallery.hidden = loadedPhotos > 0;
    if (photoRevealObserver) {
      card.classList.add("is-observed");
      photoRevealObserver.observe(card);
    } else {
      card.classList.add("is-revealed");
    }
    updateAlbumPhotoCount();
    updatePhotoNavigation();
  };
  const hidePhoto = () => {
    if (image.dataset.fullSrc && !image.dataset.fullSizeFallback) {
      image.dataset.fullSizeFallback = "true";
      image.src = image.dataset.fullSrc;
      return;
    }
    card.remove();
    settledPhotos++;
    emptyGallery.hidden = document.querySelectorAll(".gallery-item.is-visible").length > 0;
    updateAlbumPhotoCount();
    updatePhotoNavigation();
  };

  image.addEventListener("load", showPhoto);
  image.addEventListener("error", hidePhoto);

  if (image.complete) {
    if (image.naturalWidth > 0) showPhoto();
    else hidePhoto();
  }
});
