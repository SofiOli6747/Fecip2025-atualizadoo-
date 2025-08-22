<<<<<<< HEAD
const data = [
    {
        title: "A Arte da Felicidade",
        description: "Uma reflexão sobre a busca da felicidade e como alcançá-la.",
    },
    {
        title: "O Poder do Agora",
        description: "Um guia para viver no presente e encontrar a paz interior.",
    },
]

const container = document.querySelector(".container");
const searchInput = document.querySelector("#procurarInput");

const displayData = (data) => {
    container.innerHTML = "";
    data.forEach(e => {
        container.innerHTML += `
            <div class="card">
                <h2>${e.title}</h2>
                <p>${e.description}</p>
            </div>
        `;
    });
}

searchInput.addEventListener("keyup", (e) => {
    const procurar = data.filter(i => i.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
    displayData(procurar);
})

=======
const data = [
    {
        title: "A Arte da Felicidade",
        description: "Uma reflexão sobre a busca da felicidade e como alcançá-la.",
    },
    {
        title: "O Poder do Agora",
        description: "Um guia para viver no presente e encontrar a paz interior.",
    },
]

const container = document.querySelector(".container");
const searchInput = document.querySelector("#procurarInput");

const displayData = (data) => {
    container.innerHTML = "";
    data.forEach(e => {
        container.innerHTML += `
            <div class="card">
                <h2>${e.title}</h2>
                <p>${e.description}</p>
            </div>
        `;
    });
}

searchInput.addEventListener("keyup", (e) => {
    const procurar = data.filter(i => i.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
    displayData(procurar);
})

>>>>>>> 421e80a1f1f840ee126fe56279a6b89f61f81c10
window.addEventListener("load", displayData.bind(null, data));