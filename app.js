const form = document.querySelector('form')
const input = document.querySelector('input')
const container = document.querySelector('#container')

input.addEventListener('input', async function (e) {
    e.preventDefault();
    searchTerm = form[0].value;
    const config = {params: {q : searchTerm}}
    const response = await axios.get('https://api.tvmaze.com/search/shows',config);
    console.dir(response)
    display(response.data)
    if(form[0].value===""){
        resetData();
    }
    input.addEventListener('change',deleteImgs);
})

form.addEventListener('submit',function(e){
    e.preventDefault();
})



const display = (shows) => {
    // let section = document.querySelector('#show')
    for (let result of shows) {
        if (result.show.image && result.show.summary) {
            let show_div = document.createElement('div');
            show_div.classList.add('tv-show');
            let showSummary = document.createElement('span');
            const img = document.createElement('IMG');
            const title = document.createElement('h2');
            title.innerText = result.show.name;
            img.classList.add('tv-show-img');
            img.src = result.show.image.medium;
            show_div.appendChild(img);
            showSummary.innerHTML = result.show.summary;
            show_div.appendChild(title);
            show_div.appendChild(showSummary);
            container.append(show_div);
        }
    }
    
}

resetData = () => {
        const divs = document.querySelectorAll('div');
        for(let div of divs){
            div.remove();
        }
    }