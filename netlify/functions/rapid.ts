
import dotenv from "dotenv";
import { Handler } from "@netlify/functions";

dotenv.config()

//@ts-ignore
const handler: Handler = async (event, context) => {
    //@ts-ignore
    var eventbody = (event.body == '{}') ? { type: 'joke', input: 'msft' } : JSON.parse(event.body)

    // console.log(eventbody)
    // return

    var url
    if (eventbody.type == 'joke') url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search?query=' + eventbody.input
    else url = 'https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_MONTHLy&symbol=' + eventbody.input + '&datatype=json&output_size=compact'

    try {
        var res = await (await fetch(url, {
            //@ts-ignore
            headers:
            {
                'x-rapidapi-key': process.env.rapidapi,
                'x-rapidapi-host': url.split('//')[1]
            }
        })).json()
        console.log((process.env.rapidapi)?.slice(0, 4))

        return {
            statusCode: 200,
            body: JSON.stringify(res)
        }
    } catch (err) {
        return {
            statusCode: 404,
            body: console.log('error here', err)
        };
    }
};

export { handler };