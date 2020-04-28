const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');

const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// File paths for Express config
const viewPath = path.join(__dirname, '../templates/views');
app.use(express.static(path.join(__dirname, '../public')));
const partialsPath = path.join(__dirname, '../templates/partials');

// Handlebar setups and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Yan'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		message: 'Help message',
		name: 'Yan'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Yan'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Must provide an address'
		});
	} 
    
	geocode(req.query.address, (error, {lat, long, location} = {}) => {
		if (error) {
			return res.send({error});
		} 
		forecast(lat, long, (error, data) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast: data,
				location,
				address: req.query.address
			});
		});
		
	});


	// res.send({
	// 	forecast: 'Sunny',
	// 	location: 'New York',
	// 	address: req.query.address
	// });
	
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		res.send({
			error: 'Must provide a search term'
		});
	}
	console.log(req.query);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: 'Error 404',
		message: 'Unable to find help content'
	});
});

app.get('*', (req, res) => {
	res.render('error', {
		title: 'Error 404 Found',
		message: 'Unable to find page',
		name: 'Yan'
	});
});

app.listen(3000, () => {
	console.log('App is running on port 3000');
});