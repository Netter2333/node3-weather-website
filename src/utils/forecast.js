const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.openweathermap.org/data/2.5/weather?lat=' +
		encodeURIComponent(latitude) +
		'&lon=' +
		encodeURIComponent(longitude) +
		'&appid=0deb06148e375ac43ae4e98e52cb264f&units=metric';

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.message) {
			callback('Error ' + body.message, undefined);
		} else {
			const main_data = body.main;
			const weather_data = body.weather[0];
			callback(undefined, {
				weather: weather_data.description,
				temperature: main_data.temp,
				feelslike: main_data.feels_like,
				temphigh: main_data.temp_max,
				templow: main_data.temp_min,
			});
		}
	});
};

module.exports = forecast;
