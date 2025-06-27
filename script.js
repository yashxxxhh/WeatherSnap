async function getWeather(cityName = null) {
  const input = document.getElementById("cityInput").value.trim();
  const city = cityName || input;

  if (!city) {
    document.getElementById("weatherInfo").innerHTML = `<p style="color:red;">Please enter or select a city</p>`;
    return;
  }

  const apiKey = 'YOUR_API_KEY'; // replace with your real API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const weatherInfo = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Condition:</strong> ${data.weather[0].main}</p>
    `;

    document.getElementById("weatherInfo").innerHTML = weatherInfo;
  } catch (error) {
    document.getElementById("weatherInfo").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function selectCity(city) {
  document.getElementById("cityInput").value = ""; // clear manual input
  getWeather(city);
}
