
var net_fun = '/.netlify/functions/'
var github = 'github.com'
var tiko = "Tiko's"

let topnav = document.createElement('div')

create_icon()
includes()
bottom_nav()
head()

var alias_cloud = 'social_cloud'
var dateformat = /^\d{4}-\d{2}-\d{2}/


// repos()
async function repos() {
    let repos = arguments.callee.name
    let res = await (await fetch(net_fun + repos)).json()
    let div = document.createElement('div')
    div.id = repos
    let head = document.createElement('h4')
    head.classList.add('mt-4', 'mb-3')
    head.textContent = `Github ${repos} I watch`

    let ol = document.createElement('ol')
    div.append(head, ol)
    for (let i = 0; i < res.length; i++) {
        let elem = res[i]
        let li = document.createElement('li')
        li.id = elem.name
        li.style.marginBottom = '25px'
        ol.append(li)
        li.innerHTML = `<h5>${elem.name[0].toUpperCase() + elem.name.slice(1)}</h5>${elem.description}<br><br><b>Commits</b>`
        for (let j = 0; j < elem.commits.length; j++) {
            let elem2 = elem.commits[j]
            let msg = elem2.message
            let elem_name = elem.name.toLowerCase()
            let btn = ''
            let str_size = 70
            let dots = ''
            if (msg.length > str_size) {
                msg = msg.slice(0, str_size)
                msg = msg.slice(0, msg.lastIndexOf(" "))

                btn = document.createElement('button')
                btn.id = `${elem_name}${j}`
                btn.innerHTML = 'Read more'
                btn.classList.add('btn', 'btn-info')

                dots = document.createElement('span')
                dots.innerHTML = '...'
                dots.id = 'dots'

                btn.addEventListener('click', () => {
                    if (dots.style.display === "none") {
                        dots.style.display = "inline";
                        btn.innerHTML = "Read more";
                        msg = msg.slice(0, str_size)
                        msg = msg.slice(0, msg.lastIndexOf(" "))
                        comm.innerHTML = `<br><br>${elem2.date}:<br>${msg}`

                    } else {
                        dots.style.display = "none";
                        btn.innerHTML = "Read less";
                        comm.innerHTML = `<br><br>${elem2.date}:<br>${elem2.message}`
                    }
                })

            }
            let comm = document.createElement('span')
            comm.innerHTML = `<br><br>${elem2.date}:<br>${msg}`
            comm.id = `${elem_name}${j}`

            li.append(comm, dots, btn)
        }
        document.getElementById('cloud').append(div)

    }
}

async function trepos() {
    let repos = arguments.callee.name
    let res = await (await fetch(net_fun + repos)).json()
    let div = document.createElement('div')

    div.id = repos
    let head = document.createElement('h4')
    head.classList.add('mt-4', 'mb-3')
    head.textContent = 'Github repos I own'
    div.append(head, table(res, repos))
    document.getElementById('cloud').append(div)
}

async function commits() {
    let commits = arguments.callee.name
    let res = await (await fetch(net_fun + commits)).json()
    let div = document.createElement('div')

    div.id = commits
    let head = document.createElement('h4')
    head.classList.add('mt-4', 'mb-3')
    head.textContent = `My ${commits}`
    div.append(head, table(res, commits))
    document.getElementById('cloud').append(div)
}

async function posts() {
    let posts = arguments.callee.name
    let res = await (await fetch(net_fun + posts)).json()
    let div = document.createElement('div')

    div.id = posts
    let head = document.createElement('h4')
    div.append(head, table(res, posts))
    head.classList.add('mt-4', 'mb-3')
    head.textContent = `My ${posts}`
    document.getElementById('cloud').append(div)
}


async function issues() {
    let issues = arguments.callee.name

    let res = await (await fetch(net_fun + issues)).json()
    let div = document.createElement('div')

    div.id = issues
    let head = document.createElement('h4')
    head.classList.add('mt-4', 'mb-3')
    head.textContent = `My ${issues}`

    document.getElementById('cloud').append(div)

    div.append(head, table(res, issues))
}


async function accounts() {
    let accounts = arguments.callee.name
    let cloud_arr = [
        {
            name: "stack", url:
                'https://api.stackexchange.com/2.2/users/1705829?site=stackoverflow',
            link: 'link'
        },
        { name: "git", url: 'https://api.github.com/users/tik9', link: 'html_url' }
    ]
    let obj = {}
    for (let elem of cloud_arr) {
        let res = await (await fetch(elem.url)).json()
        let name = elem.name
        if (name == 'stack')
            res = Object.values(res.items)[0]

        obj[name] = res[elem.link]
    }

    let div = document.createElement('div')

    div.id = accounts
    let head = document.createElement('h4')
    head.classList.add('mt-4', 'mb-3')
    head.textContent = accounts[0].toUpperCase() + accounts.slice(1)
    document.getElementById('cloud').append(head, div)

    div.append(list(obj, accounts))
}

function head() {
    document.title += tiko;

    let container = document.getElementById('container')
    container.style.paddingBottom = '80px'

    topnav.id = 'topnav'
    topnav.classList.add('fixed-top', 'bg-dark')

    let head = document.createElement('h4')
    topnav.append(head)
    head.textContent = 'Tiko'
    head.classList.add('mt-2', 'mb-2')
    head.style.display = 'inline-block'
    head.style.color = 'white'
    head.style.marginRight = '30px'

    document.body.prepend(topnav, container)
}

function list(arr, name) {
    var ul = document.createElement('ul')
    for (var elem in arr) {
        var val = arr[elem]
        elem = elem[0].toUpperCase() + elem.slice(1)

        var li = document.createElement('li')
        ul.appendChild(li)

        li.append(document.createTextNode(`${elem}: ${val}`))
    }
    return ul
}

function create_icon() {
    var icon = document.createElement("link");
    icon.rel = 'icon'
    icon.href = 'https://' + github + "/github.png";
    document.head.appendChild(icon);
}


async function includes() {
    var links = ['https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.0/css/bootstrap.min.css', "https://fonts.googleapis.com/css?family=Roboto", "https://fonts.googleapis.com/css?family=Yellowtail"]

    for (let elem of links) {

        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = elem
        document.head.appendChild(link);
    }
    // let livejs = document.createElement('script')
    // livejs.src = 'js/live.js'
    // document.head.append(livejs)
}

function bottom_nav() {
    bottomnav.classList.add('fixed-bottom', 'bg-dark')
    for (var elem of ['index', "contact", 'imprint']) {
        var aref = document.createElement("a");
        aref.href = `${elem}.html`;
        aref.textContent = elem[0].toUpperCase() + elem.slice(1)
        bottomnav.append(aref)
        aref.id = elem
    }
    const element = document.getElementById(window.location.pathname.split('/').pop().replace('.html', ''));
    if (element) element.classList.add('active');
}