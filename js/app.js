/* targets */
const breedInput = document.querySelector("#breedInput");
const breedName = document.querySelector("#breedName");
const dogImage = document.querySelector("#dogImage");
const breedDetails = document.querySelector("#breedDetails");
const breedLikes = document.querySelector("#likes");
const likesButton = document.querySelector(".likes i");

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
let addlikesListener = false;

function renderRandomImage(res) {
	let url = res.data.message;
	dogImage.src = url;
	breedName.textContent = url.split("/")[4];
	dogImage.alt = breedName.textContent;
	breedDetails.textContent = "Hope you like your new Friend!";
	breedLikes.textContent = `0 likes`;

	//check on local
	LIVEENV ? null : fetchLikes(breedName.textContent);

	//Add likes
	likesButton.removeEventListener("click", (e) => {
		console.log(e);
	});

	if (!addlikesListener) {
		likesButton.addEventListener("click", (e) => {
			const likes = parseInt(breedLikes.textContent.split(" ")[0]) + 1;
			currentBreed.likes = likes;
			breedLikes.textContent = `${likes} likes`;

			//Update likes in database if on local
			LIVEENV ? null : likeBreed();
			addlikesListener = true;
		});
	}
}

//get random image by breed
breedInput.addEventListener("change", (e) => {
	fetchRandomImage(e.target.value).then((data) => {
		renderRandomImage(data);
	});
});

// change text on hover
breedDetails.addEventListener("mouseover", (e) => {
	breedDetails.textContent = "Click me to meet a new friend!";
});

breedDetails.addEventListener("mouseout", (e) => {
	breedDetails.textContent = "Hope you like your new Friend!";
});

//change image on click
breedDetails.addEventListener("click", (e) => {
	let breed = breedInput.value || null;
	fetchRandomImage(breed).then((data) => {
		renderRandomImage(data);
	});
});

function fetchLikes(displayedBreed) {
	axios
		.get("http://localhost:3000/breeds", {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => {
			displayedBreed.split("-").length > 1
				? (displayedBreed = displayedBreed.split("-")[0])
				: displayedBreed;

			console.log(displayedBreed);
			res.data.filter((breed) => {
				if (breed.name === displayedBreed) {
					breedLikes.textContent = `${breed.likes} likes`;
					currentBreed = breed;
					return breed;
				}
			});
		})
		.catch((err) => {
			console.log(err);
			// document.location.reload();
		});
}

function likeBreed() {
	return axios({
		method: "patch",
		url: `http://localhost:3000/breeds/${currentBreed.id}`,
		data: {
			likes: currentBreed.likes,
		},
	})
		.then((res) => null)
		.catch((err) => {
			console.log(err);
		});
}