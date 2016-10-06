import fetch from 'node-fetch'

const API_ENDPOINT = `http://www.vasttrafik.se/CustomerServices/EPiServerWs/Service.svc/GetNextTrips`
const REQUEST = {
	method: `POST`,
	headers: {
		[`Content-Type`]: `application/json`,
	},
	body: '{"request":{"RDC_Language":"sv-SE","StopAreaExternalId":"9021014004493000"}}',
}

const DESTINATIONS_TO_STENPIREN = [
	`Lilla Bommen via Stenpiren`,
	`Stenpiren, Fri resa`,
]

const filterBoatsToStenpiren = boat => {
	return DESTINATIONS_TO_STENPIREN.indexOf(boat.Destination) > -1
}

const mapUsefulInfo = boat => {
	return {
		destination: boat.Destination,
		number: boat.Line.Designation,
		next: boat.NextDepartureTime,
		after: boat.NextNextDepartureTime,
	}
}

const parse = json => {
	return json.Items
		.filter(filterBoatsToStenpiren)
		.map(mapUsefulInfo)
}

export default {
	get: async ctx => {
		ctx.body = await fetch(API_ENDPOINT, REQUEST)
			.then(res => res.json())
			.then(json => json.d)
			.then(json => parse(json))
			.catch(err => err)
	}
}
