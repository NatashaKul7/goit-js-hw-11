//// async/await functions + infinity scroll


import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { onGetImage } from './api/api';
import refs from "./refs";
import { createMarkup } from './markup';

refs.form.addEventListener('submit', onSubmit);

let page = 1;
let value = '';
let totalHitsImg = 0;

function onSubmit(e) {
  e.preventDefault();
  page = 1;
  clearContent();

  value = e.currentTarget.elements.searchQuery.value.trim();
  if (!value) 
    return Notify.info('Sorry, there are no images matching your search query. Please try again.');

takeImage();
}; 

function clearContent() { 
  totalHitsImg = 0;
  refs.spanLimit.textContent = '';
  refs.galleryCard.innerHTML = '';
}


async function takeImage() {
  try {
    const responce = await onGetImage(page, value);
    refs.form.reset();
    console.log(responce);
 
    
    if (responce.totalHits) {
      Notify.success(`Hooray! We found ${responce.totalHits} images.`);
    }

    if (responce.totalHits === 0) {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    };

    for (let i = 0; i < responce.hits.length; i++) {
      const newImage = createMarkup([responce.hits[i]]);
      refs.galleryCard.insertAdjacentHTML('beforeend', newImage);
      lightbox.refresh();
    }
    page += 1;
   
    totalHitsImg += responce.hits.length;

    if (totalHitsImg >= responce.totalHits) {
      refs.spanLimit.textContent = "We're sorry, but you've reached the end of search results."
    }
  } catch (error) {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}}


window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    takeImage();
  };
});

let lightbox = new SimpleLightbox('.gallery a',
    {
        captionDelay: 250,
  });
    






  /// functions + button loadMore


//   import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

// import { onGetImage } from './api/api';
// import refs from "./refs";

// refs.form.addEventListener('submit', onSubmit);
// refs.loadMore.addEventListener('click', onLoadMore);

// let page = 1;
// let value = '';
// let totalHitsImg = 0;
// let hits = 0;


// function onSubmit(e) {
//   e.preventDefault();
//   page = 1;
//   clearComtent();

//   value = e.currentTarget.elements.searchQuery.value.trim();
//   if (!value) 
//     return Notify.info('Sorry, there are no images matching your search query. Please try again.');

//   takeImage();

// }; 

// function clearComtent() { 
//   totalHitsImg = 0;
//   refs.spanLimit.textContent = '';
//   refs.galleryCard.innerHTML = '';
// }


// function onLoadMore() {
//   page += 1;

//   takeImage();
// };



//  function createMarkup(hits) {
//     return hits.map(
//     (
//     { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
//     ) => `<div class="photo-card">
//   <a href="${largeImageURL}">
//     <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//     </a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes:</b>
//       ${likes}
//     </p>
//     <p class="info-item">
//       <b>Views:</b>
//       ${views}
//     </p>
//     <p class="info-item">
//       <b>Comments:</b>
//       ${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads:</b>
//       ${downloads}
//     </p>
//   </div>
// </div>`)
//         .join('');
// };


// function takeImage() { 
//  onGetImage(page, value).then((arr) => {
//    refs.form.reset();
   
//    refs.galleryCard.insertAdjacentHTML('beforeend', createMarkup(arr.data.hits));
//    lightbox.refresh();
    
//     if (arr.data.totalHits) {
//     Notify.success(`Hooray! We found ${arr.data.totalHits} images.`);
//       refs.loadMore.classList.remove('hidden');
//   }

//     if (arr.data.totalHits === 0) {
//       refs.loadMore.classList.add('hidden');
//       return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//    };
   
//    totalHitsImg += arr.data.hits.length;

//     if (totalHitsImg >= arr.data.totalHits) { 
//     refs.loadMore.classList.add('hidden');
//     refs.spanLimit.textContent = "We're sorry, but you've reached the end of search results."
//     }
   
   
//   }).catch(error => 
//     Notify.failure('Sorry, there are no images matching your search query. Please try again.'));
// }

// let lightbox = new SimpleLightbox('.gallery a',
//     {
//         captionDelay: 250,
//     });