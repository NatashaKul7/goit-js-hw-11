import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { refs } from "./refs";

refs.form.addEventListener('submit', onSubmit);

let page = 1;

function onSubmit(e) { 
    e.preventDefault();

    onGetImage(page); 
};

function onGetImage(page = 1) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '38889526-086820321c5fcbdbccd359080';
    // const searchQuery = refs.form.elements.q;
    
    const params = new URLSearchParams({
        key: API_KEY,
        q: 'request',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,

    })

    return axios.get(`${BASE_URL}?${params}`).then((data) => {
        refs.galleryCard.insertAdjacentElement("beforeend", createMarkup(data))
        console.log(data)
    })
        // .catch((error) => Notify.failure('Sorry, there are no images matching your search query. Please try again.'));
}

function createMarkup({ hits}) {
    return hits.map(
    ({
     0: { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    }) => {
        `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="${likes}">
      <b>Likes</b>
    </p>
    <p class="${views}">
      <b>Views</b>
    </p>
    <p class="${comments}">
      <b>Comments</b>
    </p>
    <p class="${downloads}">
      <b>Downloads</b>
    </p>
  </div>
</div>`
        })
        .join('');
}






// function createMarkup({ 
//     hits: { 
//         0: { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
//     }
// }) { 
//     `<div class="photo-card">
//   <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="${likes}">
//       <b>Likes</b>
//     </p>
//     <p class="${views}">
//       <b>Views</b>
//     </p>
//     <p class="${comments}">
//       <b>Comments</b>
//     </p>
//     <p class="${downloads}">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>`
// }