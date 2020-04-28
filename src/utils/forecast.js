const request = require('request');

const forecast = (lat, long, cb) => {

	const url = 'http://api.weatherstack.com/current?access_key=728b6fb261f51a4625d04d32c59f4032&query=' + lat + ',' + long + '&units=f';

	request({ url, json: true }, (err, {body}) => {
		//console.log(res.body.current);
		if (err) {
			cb('Unable to connect to weather service', undefined);
		} else if (body.error) {
			cb('Unable to find location', undefined);
		}else {
			const temp = body.current.temperature;
			const descrip = body.current.weather_descriptions;
			//const fah = Math.round((celcius * (9/5)) + 32);
			const precip = body.current.precip;
			cb(undefined, `Today is ${descrip}. It is currently ${temp} degrees outside. There is ${precip}% chance of rain`);
		}
	});

};

module.exports = forecast;