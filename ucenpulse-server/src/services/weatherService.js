
/**
 * Weather Service
 *
 * Handles communication with the external Open-Meteo API.
 * Fetches and maps weather data based on geographic coordinates.
 */

const getWeatherForLocation = async (latitude, longitude) => {
  try {
    const baseUrl = process.env.WEATHER_API_BASE_URL;

     /**
     * Construct API request URL with required query parameters
     * Requests current temperature, weather code, and wind speed
     */

    const url = `${baseUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.current) {
      return null;
    }

    /**
     * Map external API response to internal application format
     * Ensures consistent structure for database storage
     */

    return {
      weatherTemp: data.current.temperature_2m ?? null,
      weatherCode: data.current.weather_code ?? null,
      weatherWindSpeed: data.current.wind_speed_10m ?? null,
    };
  } catch (error) {
    console.error("Weather service error:", error.message);
    return null;
  }
};

module.exports = { getWeatherForLocation };