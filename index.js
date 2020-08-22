const imageContainer = document.querySelector('#image-container')
const loader = document.querySelector('#loader')

let isImageReady = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// Unsplash API
let count = 5
const API_KEY = 'YOUR_API'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key])
	}
}

function imageLoaded() {
	imagesLoaded++
	if (imagesLoaded === totalImages) {
		loader.hidden = true
		isImageReady = true
		count = 30
	}
}

// Create elements for links & photos, add to the DOM
function displayPhotos() {
	imagesLoaded = 0
	totalImages = photosArray.length
	photosArray.forEach((photo) => {
		console.log('total images', totalImages)
		// Create <a> tag with attributes
		const item = document.createElement('a')
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		})

		// Create <img> tag with attributes
		const img = document.createElement('img')
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		})

		// Check when then images are finished loading
		img.addEventListener('load', imageLoaded)

		// Then append it to the parent
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
	} catch (error) {
		console.log(error, "can't fetch photos")
	}
}

// Scroll
window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 2000 &&
		isImageReady
	) {
		isImageReady = false
		getPhotos()
	}
})

// On Load
getPhotos()
