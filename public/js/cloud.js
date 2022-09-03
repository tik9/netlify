
commits()
cloud_accounts()
posts()
issues_with_this_repo()

async function cloud_accounts() {
  try {
    var res = await (await fetch('/.netlify/functions/accounts')).json()

    helper(arguments.callee.name).append(list(res, arguments.callee.name))
  } catch (error) { console.log(error) }
}

async function commits() {
  var res = await (await fetch('/.netlify/functions/commits')).json()
  res = res[0].node.target.history.edges
  var arr = []
  for (var elem of res) {
    var obj = {}
    for (var elem2 in elem.node) {
      var val = elem.node[elem2]
      if (elem2 == 'committedDate') {
        val = val.slice(0, 10)
        elem2 = 'date'
      } else if (elem2 == 'commitUrl') elem2 = 'url'

      obj[elem2] = val
    }
    arr.push(obj)
  }
  helper(arguments.callee.name).append(table(arr, arguments.callee.name))
}

async function issues_with_this_repo() {
  var res = await (await fetch('/.netlify/functions/graph?para1=issues')).json()
  var arr_field = ['title', 'body', 'url']
  var arr_date = ['createdAt', 'updatedAt']
  arr_field = arr_field.concat(arr_date)
  res = res.issues.edges

  var arr = []
  for (var elem of res) {
    var obj = {};
    for (var elem2 of arr_field) {

      var elem3 = elem2
      var val = elem.node[elem2]
      if (arr_date.includes(elem2)) {
        val = val.slice(0, 10)
        elem3 = elem2.slice(0, -2)
      }
      obj[elem3] = val
    }
    arr.push(obj)
  }
  helper(arguments.callee.name).append(table(arr, 'issues'))
}

async function posts() {
  var posts = arguments.callee.name
  var res = await (await fetch('/.netlify/functions/posts')).json()
  helper(posts).append(table(res, posts))
}