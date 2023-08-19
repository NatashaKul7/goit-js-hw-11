import { onGetImage } from './api/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import refs from "./refs";

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', onLoadMore);

let page = 1;

function onSubmit(e) {
  e.preventDefault();
  const value = e.currentTarget.elements.searchQuery.value.trim();
  if (!value) 
    return Notify.info('Sorry, there are no images matching your search query. Please try again.');



  onGetImage(page, value).then((arr) => {
    refs.galleryCard.innerHTML = '';
    refs.galleryCard.insertAdjacentHTML('beforeend', createMarkup(arr.data.hits));

    console.log(arr.data);
    refs.form.reset();

    
    if (arr.data.totalHits <= arr.data.totalHits & arr.data.totalHits !== 0 ) {
    Notify.success(`Hooray! We found ${arr.data.totalHits} images.`);
      refs.loadMore.classList.remove('hidden');
  }

    if (arr.data.totalHits === 0) {
      refs.loadMore.classList.add('hidden');
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    };
   
  }).catch(error => 
    Notify.failure('Sorry, there are no images matching your search query. Please try again.'));
  
}; 


function onLoadMore() {
  page += 1;

  onGetImage(page).then((arr) => {
    refs.galleryCard.insertAdjacentHTML('beforeend', createMarkup(arr.data.hits));

    /// шось не працює

    if (arr.data.hits >= arr.data.totalHits) { 
      refs.loadMore.classList.add('hidden');
      Notify.failure("We're sorry, but you've reached the end of search results.")
    }
  });
};


function createMarkup(hits) {
    console.log(hits);
    return hits.map(
    (
    { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) => `<div class="photo-card">
  <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views:</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      ${downloads}
    </p>
  </div>
</div>`)
        .join('');
};


let gallerySimple = new SimpleLightbox('.gallery a',
    {
        captionDelay: 250,
    });
gallerySimple.on('show.simplelightbox');
gallerySimple.refresh();





