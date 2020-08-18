const imageContainer = document.querySelector('#image-container')
const loader = document.querySelector('#loader')

let photosArray = []

// Unsplash API
const count = 10
const API_KEY = '52xbnRsxwa1i9WWTTW9u2f8MocvXBfK3nozA3ex29C4'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key])
	}
}

// Create elements for links & photos, add to the DOM
function displayPhotos() {
	photosArray.forEach((photo) => {
		// Create <a> tag
		const item = document.createElement('a')
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		})

		const img = document.createElement('img')
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		})

		item.appendChild(img)
		imageContainer.appendChild(item)
	})
}

// Get photos from Unplash API
const getPhotos = async () => {
	try {
		const response = await fetch(apiUrl)
		photosArray = await response.json()
		displayPhotos()
	} catch (error) {}
}

// Scroll
window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >=
		document.body.offsetHeight - 1000
	) {
		getPhotos()
		console.log(window.scrollY)
	}
})

// On Load
getPhotos()
