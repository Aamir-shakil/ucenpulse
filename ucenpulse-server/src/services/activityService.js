/**
 * Activity Service
 *
 * Prepares and transforms activity data before it is stored.
 * Handles input normalisation and conditional weather enrichment.
 */

const { getWeatherForLocation } = require("./weatherService");

/**
 * Build activity data object for database storage
 * - Sanitises and formats input
 * - Applies default values for optional fields
 * - Fetches weather data for outdoor activities
 */

const buildActivityData = async (data) => {
  const type = data.type.trim();
  const duration = data.duration;
  const notes = data.notes ? data.notes.trim() : null;
  const date = new Date(data.date);
  const isOutdoor = data.isOutdoor ?? false;
  const latitude = data.latitude ?? null;
  const longitude = data.longitude ?? null;

  let weatherData = {
    weatherTemp: null,
    weatherCode: null,
    weatherWindSpeed: null,
  };

   /**
   * Only fetch weather data if:
   * - activity is marked as outdoor
   * - valid coordinates are provided
   */

  if (isOutdoor && latitude !== null && longitude !== null) {
    const weatherResult = await getWeatherForLocation(latitude, longitude);
    if (weatherResult) {
      weatherData = weatherResult;
    }
  }

  return {
    type,
    duration,
    notes,
    date,
    isOutdoor,
    latitude,
    longitude,
    ...weatherData,
  };
};

module.exports = { buildActivityData };