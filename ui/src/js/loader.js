loader = () => {
    window.scrollTo(0, 0)

    let per = 0;
    let div_pace = document.querySelector('.pace');
    let div_per = document.querySelector('.pace-progress');
    let div_body = document.querySelector('body');
    let div_sas

    div_pace.style.display = 'block'
    div_body.classList.add('b4_loaded')

    let count = 0
    let progress = (n) => {
        count = n
        div_per.style.right = 100 - n + '%'
    }

    document.onreadystatechange = e => {
        if (document.readyState === 'interactive') {
            progress(25)
            setInterval(() => {
                if (document.readyState === 'interactive' && count <= 80) {
                    progress(count + 1)
                } else {
                    clearInterval()
                }
            }, 100);
            div_sas = document.querySelector('#sas');
            div_sas.classList.add('shrink')
        }
        if (document.readyState === 'complete') {
            progress(100)
            setTimeout(() => {
                div_pace.remove()
                div_body.classList.remove('b4_loaded')
                div_body.scrollIntoView(true)
                div_sas.classList.add('scale')
            }, 700);
        }
    }
}

// loader()