const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From JavaScript';

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent =
					'The current weather is ' +
					data.forecast.weather +
					'. It is currently ' +
					data.forecast.temperature +
					' degrees outside.' +
					' This high today is ' +
					data.forecast.temphigh +
					' with a low of ' +
					data.forecast.templow +
					'.';
			}
		});
	});
});
