const imageContainer = document.querySelector('#image-container')
const loader = document.querySelector('#loader')

let photosArray = []

// Unsplash API
const count = 10
const API_KEY = '52xbnRsxwa1i9WWTTW9u2f8MocvXBfK3nozA3ex29C4'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`

// Get photos from Unplash API

const getPhotos = async () => {
	try {
		const response = await fetch(apiUrl)
		photosArray = await response.json()
		console.log(photosArray)
	} catch (error) {}
}

// On Load
getPhotos()
