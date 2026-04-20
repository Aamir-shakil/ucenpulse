const { getWeatherForLocation } = require("./weatherService");

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