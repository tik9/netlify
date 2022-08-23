
accounts()
// commits_repos()
posts()


async function accounts() {
  try {
    var accounts = helper(arguments.callee.name)

    var res = await getjson(arguments.callee.name)
    // console.log(3, res)
    for (var elem of res) {
      for (var elem2 in elem) {
        var val = elem[elem2]
        var sub = document.createElement('a')
        sub.textContent = elem2[0].toUpperCase() + elem2.slice(1)
        if (elem2 != 'netlify') sub.href = 'https://' + val.url
        var ul = {}
        for (var elem3 in val) {
          if (elem3 != 'url') ul[elem3] = val[elem3]
        }
        accounts.append(sub, list(ul))
      }
    }
  } catch (error) { console.log(error) }
}

async function commits_repos() {
  var neturl = '/.netlify/functions/file'

  for (var elem of ['commits', 'repos']) {
    try {
      var comm_rep = document.createElement('div')
      var clouddiv = document.getElementById('cloud')
      clouddiv.append(comm_rep)
      comm_rep.id = elem
      comm_rep.append(table((await getjson(elem)).slice(0, 5), elem))
    } catch (error) { console.log(error) }
  }
}

function helper(elem) {
  var div = document.createElement('div')
  div.id = elem
  var clouddiv = document.getElementById('cloud')
  clouddiv.append(div)
  return div
}

async function posts() {
  try {
    var res = await (await fetch('/.netlify/functions/file?json=' + arguments.callee.name)).json()
    // console.log(1, res)
    var posts = helper(arguments.callee.name)

    for (var elem of [0, 1]) {
      var h5 = document.createElement('h5')
      h5.classList.add('mt-5', 'mb-3')
      var head = res[elem][0].cat
      h5.appendChild(document.createTextNode(head[0].toUpperCase() + head.slice(1)))
      posts.append(h5, table(res[elem], 'posts',))
    }
  } catch (error) { console.log(error) }
}