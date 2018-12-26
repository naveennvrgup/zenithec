let burl = ''
let div_clients = document.querySelector('#clients');

if (process.env.NODE_ENV === 'development') {
    burl = 'http://localhost:3000'
}

let err_msg = `
            <h2 class='text-danger text-center p-2'>
                mayday <br>
                mayday <br>
                mayday <br>
                can't fetch from database <br>
                try again later
            </h2>
        `

let after_fetched_clients = () => {
    let trashes = document.querySelectorAll('.client');
    trashes.forEach(ele => {
        let id = ele.dataset.cid
        let btn = ele.querySelector('.delete_client_btn')

        btn.addEventListener('click', e => {
            btn.innerHTML = '<i class="fa fa-spinner fa-spin text-danger"></i>'
            fetch(burl + '/clients/' + id, {
                    method: 'delete'
                })
                .then(d => d.json())
                .then(d => d ? ele.remove() : nul)
                .catch(e => {
                    btn.innerHTML = 'some error'
                })
        })
    })
}

fetch(burl + '/clients')
    .then(d => d.json())
    .then(d => {
        console.log(d)
        d.reverse()
        div_clients.innerHTML=''
        d.forEach(ele => {
            let div_ele = `
                <div class="client border border-dark rounded my-2 p-2" data-cid=${ele._id}>
                    <div class='row'>
                        <div class='col-md-10'>
                            <div><b>Name: </b>${ele.name}</div>
                            <div><b>Phone: </b>${ele.phone}</div>
                            <div><b>Email: </b>${ele.email}</div>
                            <div><b>Project: </b>${ele.task}</div>
                            <div><b>Time: </b>${ele.date}</div>
                        </div>
                        <div class='col-md-2 align-self-center text-center'>
                            <button class='btn delete_client_btn'>
                                <i class='fa fa-trash text-danger'></i>
                            </button>
                        </div>
                    </div>
                </div>
            `
            div_clients.innerHTML += div_ele
            console.log(ele)
        })
        after_fetched_clients()
    })
    .catch(e => {
        div_clients.innerHTML = err_msg
    })