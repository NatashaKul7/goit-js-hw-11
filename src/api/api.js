import axios from "axios";
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38889526-086820321c5fcbdbccd359080';

 async function onGetImage(page = 1, value) {
     try {
         axios.defaults.params = {
             key: API_KEY,
             q: value,
             image_type: 'photo',
             orientation: 'horizontal',
             safesearch: true,
             page,
             per_page: 40,
         };
         const responce = await axios.get(BASE_URL);
         return responce;
     } catch (error) { 
         console.log(error.message);
     }
}
 
export { onGetImage } 
