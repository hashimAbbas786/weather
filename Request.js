const insertText = (arrays) => {
    arrays.forEach(array => {
        const [id, value] = array;
        document.getElementById(id).innerText = value;
    })
}
const ajaxRequest = (type, url, callback) => {
    let xhr = new XMLHttpRequest();
    xhr.open(type, url);
    callback(xhr);
    xhr.send();
}
document.getElementById("location").addEventListener("change", (event) => {
    let value = document.getElementById("location").value
    ajaxRequest("GET", `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=cb74088b820d02c74994463c79452d4f`, (xhr) => {
        xhr.onload = () => {
            weather = JSON.parse(xhr.responseText)  
            console.log(weather);
            if(value && xhr.status == "200") {
                let details = [
                    ["userLocation", value],
                    ["description", weather.weather[0].description],
                    ["pressure", `Pressure: ${weather.main.pressure} hPa`],
                    ["humidity", `Humidity: ${weather.main.humidity} %`],
                    ["visibility", `Visibility: ${weather.visibility / 1000} KM`],
                    ["wind-speed", `Wind speed: ${weather.wind.speed} m/s`],
                    ["feels-temp", `Feels like(${(weather.main.feels_like - 273.15).toFixed(2)})°C`],
                    ["main-temp", `${(weather.main.temp - 273.15).toFixed(2)}°C`]
                ]
                insertText(details);
                document.getElementById("weatherIcon").setAttribute("src", `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
            } else {
                alert("No country was found")
            }    
        }
    })});
