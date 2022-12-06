let apiUrl
const apiUrls = {
    // YOU MUST CHANGE PRODUCTION URL WHEN DEPLOYING
	production: 'https://themedicapp-api.herokuapp.com',
	development: 'http://0.0.0.0:8000',
}

if (window.location.hostname === 'localhost' || window.location.hostname === '0.0.0.0') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export default apiUrl
