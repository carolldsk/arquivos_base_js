import api from './api';

class App {

    constructor(){

        this.repositories = [];
        this.formEl  = document.getElementById('search-person');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl  = document.getElementById('repo-list');
        this.registerHandlers();
    }

    registerHandlers(){

        this.formEl.onsubmit = (event) =>  this.addRepository(event);

    }


    async addRepository(event) {

        event.preventDefault();

        let repoInput = this.inputEl.value;
        console.log(repoInput);

        if(repoInput.length === 0)
            return;

        // Chamando a API e desestruturando as variáveis
        const response = await api.get(`/users/${repoInput}`);
        const {name, bio, avatar_url, html_url, location} = response.data;

        this.repositories.push({
            name,
            bio,
            avatar_url,
            html_url,
            location
        });

        this.render();
    }

    render(){

        this.listEl.innerHTML = '';

        this.repositories.forEach( repo => {

            // Elemento de imagem
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            // Titulo
            let titleEl = document.createElement('h5');
            titleEl.classList.add("card-title");           
            titleEl.appendChild(document.createTextNode(repo.name));

            // From 
            let fromEl = document.createElement('p');
            fromEl.classList.add("card-text");
            fromEl.appendChild(document.createTextNode(repo.location));

            // Descrição
            let descriptionEl = document.createElement('p');
            descriptionEl.classList.add("card-text");           
            descriptionEl.appendChild(document.createTextNode(repo.bio));

            // Card com os elementos
            let cardEl = document.createElement('div');
            cardEl.classList.add("card");

            // Body de -Card com os elementos
            let bodyCardmEl = document.createElement('div');
            bodyCardmEl.classList.add("body-card");

            bodyCardmEl.appendChild(titleEl);
            bodyCardmEl.appendChild(fromEl);
            bodyCardmEl.appendChild(descriptionEl);

            cardEl.appendChild(imgEl);
            cardEl.appendChild(bodyCardmEl);

            this.listEl.appendChild(cardEl);
        });
    }


}

new App();