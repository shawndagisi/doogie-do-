/* targets */
const breedInput = document.querySelector("#breedInput");

const LIVEENV = true;
let currentBreed = {};

document.addEventListener("DOMContentLoaded", () => {
	fetchRandomImage().then((data) => {
		renderRandomImage(data);
	});
	fetchBreedList().then((data) => {
		renderBreedList(data);
	});
});