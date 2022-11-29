"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const handler = async (event) => {
    var url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    var method = 'post';
    var body;
    if (typeof (event.queryStringParameters.input) != 'undefined') {
        url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search?query=' + event.queryStringParameters.input;
        method = 'get';
    }
    else
        body = { target: "de", q: JSON.parse(event.body).q };
    const options = {
        method: method,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': process.env.rapid
        },
        // body: JSON.stringify(body)
    };
    console.log(url, options);
    var res;
    try {
        res = (await (0, node_fetch_1.default)(url, options)).json();
    }
    catch (error) {
        console.log(1, error);
    }
    return { statusCode: 200, body: JSON.stringify(res) };
};
exports.handler = handler;
