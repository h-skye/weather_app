const request = require('request');

const geocode = (address, cb) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFubmVyeCIsImEiOiJjazhybmRpdGIwZ2pqM2VxOG5lamY1ZTN3In0.hXG6ZuGlwmuYFYiJvCEhhQ';

	//console.log(url);
	request({url, json: true}, (err, {body}) => {
		if (err) {
			cb('Unable to connect to location services!', undefined);
		} else if (body.features.length === 0 ){
			cb('Unable to find location. Try another search', undefined);
		} else {
			cb(undefined, {
				lat: body.features[0].center[1],
				long: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;