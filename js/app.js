/* targets */
const breedInput = document.querySelector("#breedInput");
const breedName = document.querySelector("#breedName");
const dogImage = document.querySelector("#dogImage");
const breedDetails = document.querySelector("#breedDetails");
const breedLikes = document.querySelector("#likes");

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

function fetchRandomImage(breed = null) {
	breedName.textContent = "Hang on";
	dogImage.src = "./images/loading1.gif";
	dogImage.alt = "Loading...";
	breedDetails.textContent = "Lemme fetch your favorite bud...";
	url = breed
		? `https://dog.ceo/api/breed/${breed}/images/random`
		: "https://dog.ceo/api/breeds/image/random";
	return axios.get(url).catch((err) => {
		console.log(err);
	});
}

function fetchBreedList() {
	url = LIVEENV
		? "https://dog.ceo/api/breeds/list/all"
		: "http://localhost:3000/breeds";
	return axios
		.get(url, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.catch((err) => {
			console.log(err);
		});
}

function renderBreedList(res) {
	if (LIVEENV) {
		const breeds = res.data.message;
		const breedList = Object.keys(breeds);
		breedList.forEach((breed) => {
			const breedOption = document.createElement("option");
			breedOption.textContent = breed;
			breedInput.appendChild(breedOption);
		});
		return;
	}
	res.data.forEach((breed) => {
		option = document.createElement("option");
		option.value = breed.name;
		option.textContent = breed.name;
		breedInput.appendChild(option);
	});
}