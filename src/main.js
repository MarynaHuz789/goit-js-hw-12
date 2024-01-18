import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from 'axios';

const API_KEY = "36166907-2dc6449c4338604cccc5458ef"
const BASE_URL = "https://pixabay.com/api/"

let currentPage = 1;
let currentSearch = "";
let totalHits = 0;
let cardHeight = 0;

const form = document.querySelector(".js_form");
const imageList = document.querySelector(".js_list");
const loader = document.querySelector(".loader")
const input = document.querySelector("input")
const loadMoreBtn = document.querySelector("#load_more_btn")


form.addEventListener("submit", onSearch);

loadMoreBtn.addEventListener("click", loadMoreImages)

async function onSearch(event) {
    event.preventDefault()

    const searchQuery = input.value.trim()

    if (!searchQuery) {
        return        
    }

    currentSearch = searchQuery
    currentPage = 1

    showLoader(loader)

    try {
        const { images, total } = await fetchImages(currentSearch, currentPage)
        totalHits = total

        renderGallery(images)

        await toggleLoadeMoreBtn(images.length)
    } catch (error) {
     hendleError(error)   
    }
    finally {
        hideLoader(loader)
        form.reset()
    }
}

async function loadMoreImages() {
    showLoader(loader)

    currentPage += 1

    try {
        const { images, total } = await fetchImages(currentSearch, currentPage)
        totalHits = total

        renderGallery(images, true)

        await toggleLoadeMoreBtn(images.length)

    //     window.scrollBy({
    //     top: cardHeight * 2,
    //     behavior: 'smooth',
    // });
    } catch (error) {
     hendleError(error)   
    }
    finally {
        hideLoader(loader)
    }
}

async function toggleLoadeMoreBtn(imagesCount) {
    if (currentPage * 40 >= totalHits) {
        loadMoreBtn.style.display = "none"
        if (imagesCount > 0) {
            await iziToast.info({
                title: "info",
                message: "We're sorry, but you've reached the end of search results."
        })
    }
    }
    else {
        loadMoreBtn.style.display = "block"
    }

}

async function fetchImages(query, page) {
    const perPage = 40;
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
        const response = await axios.get(url)

        if (response.status !== 200) {
            throw new Error("Network response was not ok!")
        }
        const { hits, totalHits } = response.data
        
        if (hits.length > 0 && currentPage === 1) {
            const firstCard = document.querySelector(".description_img")
            if (firstCard) {
                cardHeight = firstCard.getBoundingClientRect().height

                 window.scrollBy({
                 top: cardHeight * 2,
                behavior: 'smooth',
             });
            }
        }
        return {images: hits, total: totalHits}
    } catch (error) {
        throw error
    }
} 

function renderGallery(images, append = false) {
    if (!append) {
        imageList.innerHTML = ""
        
    }
    if (images.length === 0 && currentPage === 1) {
        iziToast.info({
            title: "Info",
            message: "Sorry, there are no images matching your search query. Please try again!",
        })
        loadMoreBtn.style.display = "none"
        return
    }
    const galleryHTML = createMarkup(images)

    imageList.innerHTML += galleryHTML

    let lightbox = new SimpleLightbox('.js_list a', {
    captionSelector: 'img',
    captionsData: 'alt',
    captionDelay: 250
    });

    lightbox.refresh()
}

function createMarkup(array) {
    return array.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="description_img">
  <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" width="350" height="250">
  </a>
  <ul class="description_list">
    <li class="description_item">
      <h2>Likes</h2>
      <p>${likes}</p>
    </li>
    <li class="description_item">
      <h2>Views</h2>
      <p>${views}</p>
    </li>
    <li class="description_item">
      <h2>Comments</h2>
      <p>${comments}</p>
    </li>
    <li class="description_item">
      <h2>Downloads</h2>
      <p>${downloads}</p>
    </li>
  </ul>
</li>`).join("")
}

function hendleError(error) {
    console.error("Error fetch images", error)
    const errorMessage = error.response && error.response.status === 404 ? "Sorry, there are no images matching your search query. Please try again!": "An error occurred while fetching images. Please try again later."

    iziToast.error({
        title: "Error",
        message: errorMessage
    })
}

function showLoader(loader) {
    loader.style.display = "block"
}
function hideLoader(loader) {
    loader.style.display = "none"
}