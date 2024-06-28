const cityInput = document.getElementById('cityInput');
const cityForm = document.getElementById('cityForm');



// Événement pour soumettre le formulaire de la ville
cityForm.addEventListener('submit', async (e) => {
    alert();
    // e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        try {
            const weatherData = await fetchWeather(city);
            displayWeather(weatherData);
            saveCity(city);
        } catch (error) {
            console.log('Error fetching weather data:', error);
        }
    }
});

// Fonction pour récupérer les informations météorologiques
async function fetchWeather(city) {
    const apiKey = 'a845f16954337caffe06fa592c97efc4';
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching weather data:', error);
        throw error;
    }
}

// Sauvegarde de la ville dans le stockage local
function saveCity(city) {
    try {
        localStorage.setItem('lastCity', city);
        console.log('Ville enregistrée avec succès:', city);
    } catch (error) {
        console.log('Erreur lors de l\'enregistrement de la ville:', error);
    }
}


// Déclaration des fonctions manquantes (à adapter selon vos besoins)
function displayWeather(weatherData) {
    const weatherContainer = document.getElementById('weathercentent');
    weatherContainer.textContent = `Météo à ${weatherData.name}: ${weatherData.weather[0].description}, Température: ${weatherData.main.temp}°C`;
}

function displayWeatherIcon(iconUrl) {
    const weatherContainer = document.getElementById('weather-container');
    const img = document.createElement('img');
    img.src = iconUrl;
    weatherContainer.appendChild(img);
}

