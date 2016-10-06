import fetch from 'node-fetch'

const API_ENDPOINT = `http://www.vasttrafik.se/CustomerServices/EPiServerWs/Service.svc/GetNextTrips`

export default {
	get: async ctx => {
		fetch(API_ENDPOINT, {
			method: `POST`,
			headers: {
				[`Content-Type`]: `application/json`,
			},
			body: {"request":{"RDC_Language":"sv-SE","StopAreaExternalId":"9021014004493000"}},
		}) 
			.then(res => { 
				console.log('got res: ', res)
				return res.json()
			})
			.then(json => {
				console.log(`fetched: `, json)
			})
			.catch(err => { 
				console.log('fail', err) 
			})
		
		ctx.body = {
			lindholmspiren : [1, 3, 5],
		}
	}
}
