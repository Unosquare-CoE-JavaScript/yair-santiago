import axios from 'axios';

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.querySelector('#address')! as HTMLInputElement;
const mapContainer = document.querySelector('#map')! as HTMLDivElement;

const POSITIONSTACK_API_KEY = "17292c1336011ba87aaf5f910f7579db";

type PStackErrorResponse = {
    code: string,
    message: string,
    context?: object | null
}

type PStackResult = {
    latitude: number,
    longitude: number
}

type PStackGeocodingResponse = {
    error?: PStackErrorResponse,
    data?: PStackResult[]
}

declare var ol: any;

function clearElement(el: HTMLElement): void {
    while(el.lastChild) {
        el.removeChild(el.lastChild)
    }
}
 
function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<PStackGeocodingResponse>
    (`http://api.positionstack.com/v1/forward?access_key=${
        POSITIONSTACK_API_KEY
    }&query=${
        encodeURI(enteredAddress)
    }`)
    .then(response => {
        if ( !response.data.data?.length ) { throw new Error('no results returned'); }
        
        const {longitude, latitude} = response.data.data[0];
        console.log('found', latitude, longitude);
        clearElement(mapContainer);
        new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([longitude, latitude]),
                zoom: 16
            })
        });    
    })
    .catch(err => {
        throw new Error(err.message)
    });
}

form.addEventListener("submit", searchAddressHandler);