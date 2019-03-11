const request = require("request");
const credentials = require('./credentials.js')


const RequestCiudad = function (ciudad){

	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/"'+ ciudad +'".json?access_token=' + credentials.MAPBOX_TOKEN
    
    request({url,json: true}, function (error,response){

        const data = response.body;
        const longitud = data.features[0].center[0];
        const latitud = data.features[0].center[1];

        RequestCoordenada(latitud,longitud);
    });
}

const RequestCoordenada = function(latitud,longitud){

	const url = 'https://api.darksky.net/forecast/'+ credentials.DARK_SKY_SECRET_KEY +'/'+ latitud +','+ longitud +'?units=si'

    request({url,json:true}, function(error,response){
        const data = response.body;
        const temp = data.currently.temperature;
        const probs = (data.currently.precipProbability) * 100 + "%";
        const estado = data.hourly.summary;

		console.log(estado + ' Current temperature: '+ temp +'°C. ' + 'Precipitation probability: '+ probs);
    });
}
module.exports = {
    RequestCiudad: RequestCiudad,
    RequestCoordenada: RequestCoordenada

}

RequestCiudad("Monterrey");


