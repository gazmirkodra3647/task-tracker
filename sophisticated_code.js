// Filename: sophisticated_code.js
// Content: A Weather Application with REST API Integration

// Importing required libraries
const fetch = require('node-fetch');
const readline = require('readline-sync');

// API key for OpenWeatherMap
const apiKey = 'your_api_key_here';

// Function to get weather based on location
const getWeatherByLocation = async (location) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === '404') {
      console.log(`Sorry, can't find weather for ${location}. Please try again.`);
    } else {
      const weatherDescription = data.weather[0].description;
      const temperature = (data.main.temp - 273.15).toFixed(2);
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      console.log(`Weather for ${location}:`);
      console.log(`- Description: ${weatherDescription}`);
      console.log(`- Temperature: ${temperature} °C`);
      console.log(`- Humidity: ${humidity}%`);
      console.log(`- Wind Speed: ${windSpeed} m/s`);
    }
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
};

// Main program loop
const main = async () => {
  console.log('-------------------------------------------------');
  console.log('           Welcome to the Weather App            ');
  console.log('-------------------------------------------------');

  let exit = false;

  while (!exit) {
    const location = readline.question('Enter location or "exit" to quit: ');

    if (location.toLowerCase() === 'exit') {
      exit = true;
      break;
    }

    await getWeatherByLocation(location);
    console.log('-------------------------------------------------');
  }

  console.log('Thank you for using the Weather App!');
};

// Start the program
main();