import axios from "axios";
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38889526-086820321c5fcbdbccd359080';

function onGetImage(page = 1, value) {
  
    axios.defaults.params = {
        key: API_KEY,
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
    };

    return axios.get(BASE_URL);
}

export { onGetImage}
