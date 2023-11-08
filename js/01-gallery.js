import { galleryItems } from './gallery-items.js';
// Change code below this line
const gallery = document.querySelector('.gallery');
const markup = galleryItems
  .map(
    ({ original, preview, description }) =>
      `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
        </a>
    </li>`
  )
  .join('');

gallery.insertAdjacentHTML('beforeend', markup);
gallery.addEventListener('click', selectImg);

function selectImg(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${evt.target.dataset.source}">`,
    {
      onShow: instance => {
        window.addEventListener('keydown', onPressEscKey);
      },
      onClose: instance => {
        window.removeEventListener('keydown', onPressEscKey);
      },
    }
  );
  instance.show();

  function onPressEscKey(evt) {
    if (evt.code == 'Escape') {
      instance.close();
    }
  }
}
