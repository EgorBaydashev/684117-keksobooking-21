'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const Photo = {
  PHOTO_SIZE: 70,
  ALT: `Фотография жилья`
};

let previewAvatar = document.querySelector(`.ad-form-header__preview img`);
let previewPhoto = document.querySelector(`.ad-form__photo`);

const loadPreview = function (evt, preview) {
  let file = evt.target.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const loadAvatarHandler = function (evt) {
  loadPreview(evt, previewAvatar);
};

const loadPhotosHandler = function (evt) {
  let roomsImg = document.createElement(`img`);

  roomsImg.width = Photo.PHOTO_SIZE;
  roomsImg.height = Photo.PHOTO_SIZE;
  roomsImg.alt = Photo.ALT;

  previewPhoto.appendChild(roomsImg);

  loadPreview(evt, roomsImg);
};

const resetPreviews = function () {
  previewAvatar.src = `img/muffin-grey.svg`;
  previewPhoto.textContent = ``;
};

window.preview = {
  loadAvatarHandler,
  loadPhotosHandler,
  resetPreviews
};
