// menubar h8 adjust
let navbar = document.querySelector('.dflex');

window.addEventListener('scroll', e => {
    let scroll_h8 = window.scrollY;
    if (scroll_h8) {
        navbar.classList.add('sm_nav')
    } else {
        navbar.classList.remove('sm_nav')
    }
})

// scroll concered items
let scroll_items = ['home', 'about', 'services', 'working', 'contact']

// scroll to view
let scroll_anchors = scroll_items.map(e => {
    return document.querySelector('#a_' + e);
})
let scroll_targets = scroll_items.map(e => {
    return document.querySelector('#' + e);
})

// func to set the active class for j
let set_active_class = (j) => {
    for (let i = 0; i < scroll_items.length; i++) {
        scroll_anchors[i].classList.remove('active')
    }
    scroll_anchors[j].classList.add('active')
}

for (let j = 0; j < scroll_items.length; j++) {
    // desktop scroll into view
    scroll_anchors[j].addEventListener('click', e => {
        scroll_targets[j].scrollIntoView({
            behavior: 'smooth'
        })
    })
}

// set active class on scroll
window.addEventListener('scroll', e => {
    let len = scroll_items.length
    for (let i = 0; i < len; i++) {
        let ele_y = scroll_targets[i].offsetTop + scroll_targets[i].scrollHeight - 200
        if (ele_y > window.scrollY) {
            set_active_class(i)
            // console.log(i,window.scrollY);
            break
        }
    }
})

// wow js
import wow from './wow.min.js'
new wow({
    mobile: false
}).init();

// chat
let name = document.querySelector('#name');
let phone = document.querySelector('#ph_no');
let email = document.querySelector('#email');
let project = document.querySelector('#project');
let submit_btn = document.querySelector('.submit_btn');
let burl = ''

if (process.env.NODE_ENV === 'development') {
    burl = 'http://localhost:8000'
}

submit_btn.addEventListener('click', (e) => {
    e.preventDefault()
    submit_btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>'

    let data = {
        name: name.value,
        phone: phone.value,
        email: email.value,
        project: project.value
    }
    // console.log(data);
    fetch(burl + '/chat/', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(d => d.json())
        .then(d => {
            console.log(d)
            if (d.msg) {
                submit_btn.innerHTML = 'please fill all the fields & try again'
            } else {
                submit_btn.classList.add('submit_success')
                submit_btn.innerHTML = 'see you soon!'
                name.value=''
                phone.value=''
                email.value=''
                project.value=''
            }
        })
        .catch(e => {
            submit_btn.innerHTML = 'try again!'
        })
})