
create_icon()

var host = 'https://google-translate1.p.rapidapi.com'
var url = host + '/language/translate/v2/languages'

async function test() {
    var res = await (await fetch('/.netlify/functions/getenv?env=netlify')).json()
    console.log(res)
    // var res = await (await fetch(url, {headers:{'x-rapidapi-key': env,'x-rapidapi-host': host}}))
}
test()

async function test2() {
    var res = await (await fetch('/.netlify/functions/test')).json()
    console.log(2, res)
}

// test2()