
// document.getElementById('btn_startmod').addEventListener('click', function () {
// var mod = makeModal()
// });
// function makeModal() {
// console.log(1, arguments.callee.name)

// }

git_code(['js/table.js'])
// includes()
navtop()
navtoparef_title()


var res
async function getjson(file = 'sys') {
  if (!res) res = await (await fetch('/.netlify/functions/file?json=all')).json()
  // console.log(1, res)
  for (var json of res) { if (typeof json[file] != 'undefined') return json[file] }
}

function groupByKey(list, key) {
  return list.reduce((hash, { [key]: value, ...rest }) =>
    ({ ...hash, [value]: (hash[value] || []).concat({ ...rest }) }), {})
}

async function includes() {
  var arr = await css_js([], 'js')
  arr.sort()
  git_code(arr)
  script_(arr)
}

function locale_date(date = '') {
  var today = new Date()
  var todayDate = today.toISOString().substring(0, 10);
  var dateformat = { day: '2-digit', month: '2-digit', year: 'numeric' }

  return date == todayDate ? 'today' : new Date(today.setDate(today.getDate() - 1)).toISOString().substring(0, 10) == date ? 'yesterday' : new Date(date).toLocaleDateString('de-de', dateformat)
}


function navhelp(arr) {
  for (var elem of arr) {
    var aref = document.createElement('a')
    aref.textContent = elem
    aref.href = '#' + elem
    aref.classList.add('nav')
    topnav.append(aref)
  }
}

function navtop() {
  var aref = document.createElement("a");
  aref.classList.add('nav', 'active')
  aref.href = '#container';
  aref.textContent = 'Index'
  topnav.append(aref)
}

function navtoparef_title() {
  var arr = []
  var headers = { cloud: 'My social cloud actvities', sys: 'Node server in use', apis: 'Apis I favour' }
  for (var elem in headers) {
    var div = document.getElementById(elem)
    div.classList.add('mb-4', 'mt-4')
    arr.push(elem)
    var head = document.createElement('h4')
    head.innerText = headers[elem]
    head.classList.add('mb-3', 'mt-5')
    div.prepend(head)
  }

  for (var elem of arr) {
    var aref = document.createElement('a')
    aref.textContent = elem
    aref.href = '#' + elem
    aref.classList.add('nav')
    topnav.append(aref)
  }
  container.prepend(topnav)
}

//# sourceURL=dynamicScript.js
