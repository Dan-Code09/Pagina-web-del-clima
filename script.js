let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let api_key = '11b5ee262db4c31e1a6c01df75231f48'
let difKelvin = 273.15



document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value
    if(ciudad){
        fetchDatosClima(ciudad)
    }
})

function fetchDatosClima(ciudad){
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
    .then(data => data.json())
    .then(data => mostrarDatosClima(data))
     
}

function mostrarDatosClima(data){
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML='' //esta funcion limpia los datos del clima anterior

    const ciudadNombre = data.name
    const paisNombre = data.sys.country
    const temperatura = data.main.temp
    const humedad = data.main.humidity
    const descripcion = data.weather[0].description
    const icono = data.weather[0].icon
    const sunrise = data.sys.sunrise * 1000;
    const sunset = data.sys.sunset * 1000;

    const ciudadTitulo = document.createElement('h2')
    ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`

    const temperaturaInfo = document.createElement('p')
    temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura-difKelvin)}°C`
   
    const humedadInfo = document.createElement('p')
    humedadInfo.textContent = `La humedad es: ${humedad}%`

    const iconoInfo = document.createElement('img')
    iconoInfo.src= `https://openweathermap.org/img/wn/${icono}@2x.png`
 
    const descripcionInfo = document.createElement('p')
    descripcionInfo.textContent = `La descripcion meteorologica es: ${descripcion}`

    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(temperaturaInfo)
    divDatosClima.appendChild(humedadInfo)
    divDatosClima.appendChild(iconoInfo)
    divDatosClima.appendChild(descripcionInfo)


    cambiarColorFonfo(sunrise, sunset);


    actualizarCielo(descripcion);
}

//Codigo para interactuar con el clima

function cambiarColorFonfo(sunrise, sunset) {
    const now = new Date().getTime();

    if (now >= sunrise && now <= sunset) {
        //es de dia
        document.body.style.backgroundColor = "#87CEEB";
    } else {
        //es de noche
        document.body.style.backgroundColor = "#2F4F4F";
    }
}



// Función para actualizar el cielo
// Función para actualizar el fondo y las animaciones de las nubes
function actualizarCielo(descripcion) {
    const sky = document.querySelector('.sky');
    sky.classList.remove('cloudy', 'sunny', 'rainy');  // Elimina las clases previas

    if (descripcion.includes('cloud')) {
        sky.classList.add('cloudy');  // Nublado
    } else if (descripcion.includes('clear')) {
        sky.classList.add('sunny');   // Soleado
    } else if (descripcion.includes('rain')) {
        sky.classList.add('rainy');   // Lluvia
    }
}
