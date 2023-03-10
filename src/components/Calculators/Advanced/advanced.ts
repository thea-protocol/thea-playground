import airports from '../data/airports.json'


/* HOUSEHOLD */
const houseKWhFactors = {
    "Afghanistan": "0.4572",
    "Albania": "0.4572",
    "Algeria": "0.6242",
    "American Samoa": "",
    "Andorra": "0.4572",
    "Angola": "0.4150",
    "Anguilla": "",
    "Antarctica": "",
    "Antigua and Barbuda": "0.2646",
    "Argentina": "0.3560",
    "Armenia": "0.1772",
    "Aruba": "0.2646",
    "Australia": "0.8400",
    "Austria": "0.1174",
    "Azerbaijan": "0.5456",
    "Bahamas": "0.2646",
    "Bahrain": "0.7324",
    "Bangladesh": "0.6261",
    "Barbados": "0.2646",
    "Belarus": "0.4025",
    "Belgium": "0.1677",
    "Belize": "0.2646",
    "Benin": "0.7543",
    "Bermuda": "0.2646",
    "Bhutan": "0.7420",
    "Bolivia": "0.4298",
    "Bosnia and Herzegowina": "0.9706",
    "Botswana": "1.4716",
    "Bouvet Island": "",
    "Brazil": "0.0844",
    "British Indian Ocean Territory": "",
    "Brunei Darussalam": "0.6034",
    "Bulgaria": "0.4051",
    "Burkina Faso": "0.4978",
    "Burundi": "0.4978",
    "Cambodia": "0.6347",
    "Cameroon": "0.2138",
    "Canada": "0.1200",
    "Cape Verde": "0.4978",
    "Cayman Islands": "0.2646",
    "Central African Republic": "0.4978",
    "Chad": "0.4978",
    "Chile": "0.4550",
    "China": "0.5703",
    "Christmas Island": "0.5735",
    "Cocos (Keeling) Islands": "",
    "Colombia": "0.2268",
    "Comoros": "0.4978",
    "Congo": "0.3856",
    "Congo, the Democratic Republic of the": "0.0015",
    "Cook Islands": "0.5735",
    "Costa Rica": "0.0072",
    "Cote d'Ivoire": "0.5000",
    "Croatia (local name: Hrvatska)": "0.2503",
    "Cuba": "0.8577",
    "Cyprus": "0.6635",
    "Czech Republic": "0.5172",
    "Denmark": "0.1494",
    "Djibouti": "0.4978",
    "Dominica": "0.2646",
    "Dominican Republic": "0.6526",
    "East Timor": "0.7420",
    "Ecuador": "0.3690",
    "Egypt": "0.5202",
    "El Salvador": "0.2878",
    "Eritrea": "0.9389",
    "Estonia": "0.6600",
    "Ethiopia": "0.0003",
    "Falkland Islands (Malvinas)": "0.2646",
    "Faroe Islands": "0.4572",
    "Fiji": "0.5735",
    "Finland": "0.0982",
    "France": "0.0537",
    "France, Metropolitan": "0.3861",
    "French Guiana": "0.3861",
    "French Polynesia": "0.3861",
    "French Southern Territories": "0.3861",
    "Gabon": "0.4871",
    "Gambia": "0.4871",
    "Georgia": "0.1235",
    "Germany": "0.1235",
    "Ghana": "0.1235",
    "Gibraltar": "0.1235",
    "Greece": "0.1235",
    "Greenland": "0.1235",
    "Grenada": "0.1235",
    "Guadeloupe": "0.1235",
    "Guam": "0.1235",
    "Guatemala": "0.1235",
    "Guinea": "0.1235",
    "Guinea-Bissau": "0.1235",
    "Guyana": "0.1235",
    "Haiti": "0.1235",
    "Heard and Mc Donald Islands": "0.1235",
    "Holy see (Vatican City State)": "0.1235",
    "Honduras": "0.1235",
    "Hong Kong": "0.1235",
    "Hungary": "0.1235",
    "Iceland": "0.1235",
    "India": "0.1235",
    "Indonesia": "0.1235",
    "Iran (Islamic Republic of)": "0.1235",
    "Iraq": "0.1235",
    "Ireland": "0.1235",
    "Israel": "0.1235",
    "Italy": "0.1235",
    "Jamaica": "0.1235",
    "Japan": "0.1235",
    "Jordan": "0.1235",
    "Kazakhstan": "0.1235",
    "Kenya": "0.1235",
    "Kiribati": "0.1235",
    "Korea, Democratic People's Republic of": "0.1235",
    "Korea, Republic of": "0.1235",
    "Kosovo": "0.1235",
    "Kuwait": "0.1235",
    "Kyrgyzstan": "0.1235",
    "Lao People's Democratic Republic": "0.1235",
    "Latvia": "0.1235",
    "Lebanon": "0.1235",
    "Lesotho": "0.1235",
    "Liberia": "0.1235",
    "Libya": "0.1235",
    "Liechtenstein": "0.1235",
    "Lithuania": "0.1235",
    "Luxembourg": "0.1235",
    "Macau": "0.1235",
    "Macedonia, the former Yugoslav Republic of": "0.1235",
    "Madagascar": "0.1235",
    "Malawi": "0.1235",
    "Malaysia": "0.1235",
    "Maldives": "0.1235",
    "Mali": "0.1235",
    "Malta": "0.1235",
    "Marshall Islands": "0.1235",
    "Martinique": "0.1235",
    "Mauritania": "0.1235",
    "Mauritius": "0.1235",
    "Mayotte": "0.1235",
    "Mexico": "0.1235",
    "Micronesia, Federated States of": "0.1235",
    "Moldova, Republic of": "0.1235",
    "Monaco": "0.1235",
    "Mongolia": "0.1235",
    "Montenegro": "0.1235",
    "Montserrat": "0.1235",
    "Morocco": "0.7791",
    "Mozambique": "0.0748",
    "Myanmar": "0.0748",
    "Namibia": "0.0748",
    "Nauru": "0.0748",
    "Nepal": "0.0748",
    "Netherlands": "0.0748",
    "Netherlands Antilles": "0.0748",
    "New Caledonia": "0.0748",
    "New Zealand": "0.0748",
    "Nicaragua": "0.0748",
    "Niger": "0.0748",
    "Nigeria": "0.0748",
    "Niue": "0.0748",
    "Norfolk Island": "0.0748",
    "Northern Mariana Islands": "0.0748",
    "Norway": "0.0748",
    "Oman": "0.0748",
    "Pakistan": "0.0748",
    "Palau": "0.0748",
    "Palestinian Territory, occupied": "0.0748",
    "Panama": "0.0748",
    "Papua New Guinea": "0.0748",
    "Paraguay": "0.0748",
    "Peru": "0.0748",
    "Philippines": "0.0748",
    "Pitcairn": "0.0748",
    "Poland": "0.0748",
    "Portugal": "0.0748",
    "Puerto Rico": "0.0748",
    "Qatar": "0.0748",
    "Reunion": "0.0748",
    "Romania": "0.0748",
    "Russian Federation": "0.0748",
    "Rwanda": "0.0748",
    "Saint Kitts and Nevis": "0.0748",
    "Saint Lucia": "0.0748",
    "Saint Vincent and the Grenadines": "0.0748",
    "Samoa": "0.0748",
    "San Marino": "0.0748",
    "Sao Tome and Principe": "0.0748",
    "Saudi Arabia": "0.0748",
    "Senegal": "0.0748",
    "Serbia": "0.0748",
    "Seychelles": "0.0748",
    "Sierra Leone": "0.0748",
    "Singapore": "0.0748",
    "Sint Maarten": "0.0748",
    "Slovakia": "0.0748",
    "Slovenia": "0.0748",
    "Solomon Islands": "0.0748",
    "Somalia": "0.0748",
    "South Africa": "0.0748",
    "South Georgia and the South Sandwich Islands": "0.0748",
    "South Sudan": "0.0748",
    "Spain": "0.0748",
    "Sri Lanka": "0.0748",
    "St. Helena": "0.0748",
    "St. Pierre and Miquelon": "0.0748",
    "Sudan": "0.0748",
    "Suriname": "0.0748",
    "Svalbard and Jan Mayen Islands": "0.0748",
    "Swaziland": "0.0748",
    "Sweden": "0.0748",
    "Switzerland": "0.0748",
    "Syrian Arab Republic": "0.0748",
    "Taiwan, Republic of China": "0.0748",
    "Tajikistan": "0.0087",
    "Tanzania, United Republic of": "0.0087",
    "Thailand": "0.4810",
    "Togo": "0.2681",
    "Tokelau": "",
    "Tonga": "0.5735",
    "Trinidad and Tobago": "0.5931",
    "Tunisia": "0.5241",
    "Turkey": "0.4195",
    "Turkmenistan": "1.0169",
    "Turks and Caicos Islands": "0.2646",
    "Tuvalu": "",
    "Uganda": "0.4978",
    "Ukraine": "0.4466",
    "United Arab Emirates": "0.4179",
    "United Kingdom": "0.2111",
    "United States": "0.3929",
    "United States minor outlying islands": "0.2646",
    "Uruguay": "0.0562",
    "Uzbekistan": "0.6003",
    "Vanuatu": "0.5735",
    "Venezuela": "0.3791",
    "Vietnam": "0.5209",
    "Virgin Islands (British)": "0.2646",
    "Virgin Islands (U.S.)": "0.2646",
    "Wallis and Futuna Islands": "0.5735",
    "Western Sahara": "0.4978",
    "Yemen": "0.8863",
    "Yugoslavia": "",
    "Zambia": "0.0233",
    "Zimbabwe": "0.8455"
}

 const householdEmissionFactors = {
        "Electricity":
        {
            "kWh":3929.00e-4
        },
        "Natural Gas":{
            "kWh":1825.40e-4,
            "therms":53484.40e-4,
            "USD ($)":43000.00e-4
        },
        "Heating Oil":{
            "kWh":2467.70e-4,
            "litres":25401.30e-4,
            "metric tons":31650100.00e-4,
            "US gallons":96154.30e-4
        },
        "Coal":{
            "kWh":3446.20e-4,
            "metric tons":28832600.00e-4,
            "x 10kg bags":288326.00e-4,
            "x 20kg bags":576652.00e-4,
            "x 25kg bags":720815.00e-4,
            "x 50kg bags":1441630.00e-4
        },
        "LPG":{
            "kWh":2144.90e-4,
            "litres":15570.90e-4,
            "therms":62845.80e-4,
            "US gallons":58942.20e-4
        },
        "Propane":{
            "litres":15435.40e-4,
            "US gallons":58429.30e-4
        },
        "Wooden pellets":{
            "metric tons":505545.90e-4
        }
    }



/* FLIGHT */

const classEmissionFactors = {
    "Economy class":7.438461987823514e-05,
    "Premium economy":0.001292692579585472,
    "Business class":0.002342989027933467,
    "First class":0.0032317965392244853,
    "Average (unknown class)":0.0010549178568651433
}        

const RADIATIVE_FORCING_FACTOR = 1.891

/* MOTORBIKE */

const bikeTypes = {
    //g/km
    "1": 83.06, // "small motorbike/moped/scooter up to 125cc"
    "2": 100.9, // "medium motorbike over 125cc and up to 500cc"
    "3": 132.45 // "large motorbike over 500cc"
}

const emmissionFactors = {
    "g/km":1e-6,
    "L/100km":21.6185e-6,
    "mpg(UK)":61.0701e-4,
    "mpg(US)":50.8510e-4
}

/* BUS & RAIL */

const busEmissionFactors = {
    "Bus": 0.1553,
    "Coach": 0.04398,
    "Local or Commuter Train": 0.05711,
    "Long Distance Train": 0.00718,
    "Tram": 0.04604,
    "Subway": 0.04475,
    "Taxi":0.2394
}


export class AdvancedCalculator {
    constructor () {
        this.countries = Object.keys(houseKWhFactors)
    }

    calculateFlight (isReturn, from, to, travelClass, trips, includeRad) {


        const getAirportCoordinates = (airportCode) => {
            const res = airports.find(item => item.code == airportCode)
            if (!res) {
              console.log(`Invalid airport code "${airportCode}"`)
              return [0,0]
            }
            return [res.lat, res.long]
          }        
        const toRad = (val) =>  val * Math.PI / 180 

        const calcDistance = (lat1, lon1, lat2, lon2)  => {
            const R = 6371; // km
            const dLat = toRad(lat2-lat1);
            const dLon = toRad(lon2-lon1);
            lat1 = toRad(lat1);
            lat2 = toRad(lat2);
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            return R * c
        }  

        const findAirportDistance = (from, to) => {
            const [lat1, lon1] = getAirportCoordinates(from)
            const [lat2, lon2] = getAirportCoordinates(to)
            return calcDistance(lat1, lon1, lat2, lon2)

        }

        const distance = findAirportDistance(from, to)

        const emissionFactor = classEmissionFactors[travelClass]

        let emission = (distance*emissionFactor)*trips*(isReturn ? 2 : 1)
        if (includeRad) {
            emission = emission*RADIATIVE_FORCING_FACTOR
        }
        return emission
    }

    calculateMotorbike(type, amount, isMiles) {
        const milage = isMiles ? amount * 1.609344 : amount
        const efficiency = bikeTypes[type]
        const unit = "g/km"
        return milage*emmissionFactors[unit]*efficiency
    }

    

    calculateHouseHold(consumption, factor) {
        const emissions = Object.keys(consumption).map(key => 
            consumption[key].amount * householdEmissionFactors[key][consumption[key].unit])
        return emissions.reduce((a,b) => a + b, 0) / 1000
    }

    calculateBus(consumption, isMiles) {
        const emissions = Object.keys(consumption).map(key => 
             consumption[key] * busEmissionFactors[key] )
        return emissions.reduce((a,b) => a + b, 0) / 1000 

    }

}
    
    