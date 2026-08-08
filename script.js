async function getWeather() {
  const cityInput = document.getElementById("city");
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const apiKey = "70d61e4d968c8b5b0f8567e4d3154b39";
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  const resultEl = document.getElementById("result");

  try {
    const response = await fetch(url);

    // Handles cases like 401/429/500 etc.
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const data = await response.json();

    // Handles “city not found”
    if (data.cod === "404" || data.cod === 404) {
      resultEl.innerHTML = "<p style='color:red;'>City not found!</p>";
      return;
    }

    resultEl.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <div class="temp">${Math.round(data.main.temp)}°C</div>
      <div class="desc">${data.weather?.[0]?.description ?? ""}</div>
      <div class="info">
        <div>Humidity<span>${data.main.humidity}%</span></div>
        <div>Wind Speed<span>${data.wind.speed} km/h</span></div>
        <div>Feels Like<span>${Math.round(data.main.feels_like)}°C</span></div>
      </div>
    `;
  } catch (error) {
    console.error(error);
    resultEl.innerHTML = "<p style='color:red;'>Something went wrong!</p>";
  }
}