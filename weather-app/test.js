// Enter your API key here
const apiKey = "be1d5736e1098f8482174308a6b2c23c";

// base_url variable to store URL
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?";

// Function to get weather data
async function getWeather(cityName) {
  // Complete URL variable to store the complete URL address
  const completeUrl = `${baseUrl}appid=${apiKey}&q=${cityName}`;

  try {
    // Fetch method to get the response from the API
    const response = await fetch(completeUrl);

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error("City Not Found");
    }

    // Convert the response data into JSON format
    const data = await response.json();

    // Now data contains nested dictionaries
    const { main, weather } = data;

    // Store the values corresponding to the keys
    const currentTemperature = main.temp;
    const currentPressure = main.pressure;
    const currentHumidity = main.humidity;
    const weatherDescription = weather[0].description;

    // Print the following values
    console.log(`Temperature (in kelvin unit) = ${currentTemperature}
Atmospheric pressure (in hPa unit) = ${currentPressure}
Humidity (in percentage) = ${currentHumidity}
Description = ${weatherDescription}`);
  } catch (error) {
    console.error(error.message);
  }
}

// Prompt user for city name and call the getWeather function
const cityName = prompt("Enter city name : ");
getWeather(cityName);
