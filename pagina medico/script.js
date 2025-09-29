//codigo pra abrir e fechar a tela de cadastro/login

document.getElementById("botao-cadastro").addEventListener('click', function(){ //evento "click"
   
    document.getElementById("form-loginn").style.display = "block"; //mostra a tela de login
    document.getElementById("blur-bg").style.display = "block";

});
document.getElementById("close-btn").addEventListener('click', function(){
    
    document.getElementById("form-loginn").style.display = "none"; //fecha a tela de login
    document.getElementById("blur-bg").style.display = "none";

});
document.getElementById("close-btn2").addEventListener('click', function(){
    
    document.getElementById("form-cadastro").style.display = "none";
    document.getElementById("blur-bg").style.display = "none";

});

//alternar tela de cadastro e login 

function toggleForms() {
    const loginForm = document.getElementById('form-loginn');  //definição de constantes
    const registerForm = document.getElementById('form-cadastro'); 
    
    if (loginForm.style.display === 'none') { //se a tela de login não estive na tela, ela aparece e a tela de cadastro some 
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {                                    // senão, fecha a tela de login e mostra a tela de cadastro 
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}



//codigo pra abrir e fechar aba de categorias

const botaoCategoria = document.getElementById("categoria-link");
const aba = document.getElementById("form-categoria");;

botaoCategoria.addEventListener("click", () => {
    if (aba.style.display === "none" || aba.style.display === "") {   //mesmo esquema das anteriores 
        aba.style.display = "block";
    } else{
        aba.style.display = "none"
        
    }
});




//codigo pra gerador de senha aleatória


const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");


// Funções
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97); //adiciona à const as letras do alfabeto em minúsculo
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65); //adiciona à const as letras do alfabeto em maiúsculo
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();  //adiciona à const os números de 0 a 9
};

const getSymbol = () => {
  const symbols = "(){}[]=<>/,.!@#$%&*+-";      //adiciona à const os símbolos do teclado
  return symbols[Math.floor(Math.random() * symbols.length)];  
};

const generatePassword = (     //const gerar senha
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
) => {
  let password = ""; //let senha

  const passwordLength = 10;

  const generators = [    //const gerador
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
  ]

  for (i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();

      password += randomValue;
    });
  }

  password = password.slice(0, passwordLength);

  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
};

// Eventos
generatePasswordButton.addEventListener("click", () => {
  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
  );
});

document.getElementById("close-btn2").addEventListener('click', function(){
    generatedPasswordElement.querySelector("h4").innerText = '';
})


openCloseGeneratorButton.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

copyPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  const password = generatedPasswordElement.querySelector("h4").innerText;

});

//---------

// códigos para quando for clicado em cada uma das opções do início(tela do cliente)

function selecionarMed(params) {
  window.location.href = "medicamentos.html";
}
function selecionarHist(params) {
  window.location.href = "historico.html";
}
function selecionarlojas(params) {
  window.location.href = "lojas.html";
}



//---------

//código para encaminhar o usuário para sua respectiva tela

function selecionarCliente(params) {
  window.location.href = "cliente.html";
}

function selecionarMedico(params) {
  window.location.href = "medico.html";
}


const farmaciasSalvas = JSON.parse(localStorage.getItem("farmaciasSalvas")) || [];

const medicamentosSalvos = JSON.parse(localStorage.getItem("medicamentosSalvos")) || [];




async function buscarFarmaciasPorEndereco() {
  const endereco = document.getElementById("endereco").value;
  if (!endereco) {
    alert("Por favor, digite um endereço.");
    return;
  }

  try {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: endereco }, (resultados, status) => {
      if (status === "OK" && resultados[0]) {
        const localizacao = resultados[0].geometry.location;
        buscarFarmacias(localizacao.lat(), localizacao.lng());
      } else {
        alert("Endereço não encontrado. Tente outro.");
      }
    });
  } catch (erro) {
    console.error("Erro na geocodificação:", erro);
  }
}


function buscarFarmacias(latitude, longitude) {
  const tableBody = document.querySelector(".pricing-table tbody");
  tableBody.innerHTML = "";

  const localizacao = new google.maps.LatLng(latitude, longitude);
  const mapa = new google.maps.Map(document.createElement("div")); // mapa invisível
  const service = new google.maps.places.PlacesService(mapa);

  const request = {
    location: localizacao,
    radius: 2000,
    keyword: "farmácia"
  };

  service.nearbySearch(request, (resultados, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const destinos = resultados.map(r => r.geometry.location);

      const distanceService = new google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix({
        origins: [localizacao],
        destinations: destinos,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      }, (response, statusDistancia) => {
        if (statusDistancia === "OK") {
          resultados.forEach((resultado, i) => {
            const nome = resultado.name || "Nome não disponível";
            const endereco = resultado.vicinity || "Endereço não disponível";
            const distanciaTexto = response.rows[0].elements[i].distance?.text || "Distância não disponível";
            const farmacia = { 
              nome: resultado.name,
              endereco: resultado.vicinity,
            };


            const linha = document.createElement("tr");
            linha.draggable = true;
            linha.ondragstart = (event) => {
              const farmaciaJson = JSON.stringify(farmacia); // ✅ transforma em JSON
              event.dataTransfer.setData("text/plain", farmaciaJson);
            };
            linha.innerHTML = `
              <td>💊 <strong>Farmácia:</strong> ${nome}</td>
              <td>📍 <strong>Endereço:</strong> ${endereco}</td>
              <td>📏 <strong>Distância:</strong> ${distanciaTexto}</td>
            `;
            tableBody.appendChild(linha);
          });
        } else {
          console.error("❌ Erro ao calcular distâncias:", statusDistancia);
        }
      });
    } else {
      console.error("❌ Erro ao buscar farmácias:", status);
    }
  });
}








//código para o histórico 


function registrarHistoricoPesquisa() {

  const termo = document.getElementById("searchInput").value.trim();

  const agora = new Date();
  const dataHora = agora.toLocaleString('pt-BR'); // formato: dd/mm/aaaa hh:mm:ss

  const pesquisa =  {
          termo: termo,
          dataHora: dataHora};

  let historico = JSON.parse(localStorage.getItem('historicoPesquisas')) || [];

    // Adiciona novo termo (evita duplicatas)
    // if (!historico.includes(termo)) {
    //   historico.unshift({termo, dataHora}); // adiciona no início
    //   if (historico.length > 10) historico.pop(); // limita a 10 termos
    // }

    // Salva no localStorage
    localStorage.setItem('historicoPesquisas', JSON.stringify(historico));

    console.log(historico);

    const token = localStorage.getItem("token"); 
    fetch("/medico/historico", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(pesquisa)
    })
    .then(res => res.text())
    .then(msg => console.log("busca salva no banco:", msg))
    .catch(err => console.error("Erro ao salvar no banco:", err));

    // Atualiza a lista na tela
    exibirHistoricoPesquisas();
}



function exibirHistoricoPesquisas() {
    const historico = JSON.parse(localStorage.getItem('historicoPesquisas')) || [];
    const lista = document.getElementById('listaHistorico');

   

    if(lista){
      lista.innerHTML = '';

    const token = localStorage.getItem("token");

    fetch("/medico/dados", {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    .then(res => res.json())
    .then(data => {
      const historico = data.historico || [];
      if (historico.length === 0) {
      lista.innerHTML = "<p>Nenhuma busca salva ainda.</p>";
      return;
    }
    console.log(historico);
    historico.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>🔍 <strong>Pesquisa:</strong> ${item.busca}<br>
        🕒 <em>${item.data_pesquisam}</em></p>
        <hr>
      `;
      lista.appendChild(div);
    });
})

    }
    
  //exibirHistoricoPesquisas();
}


function limparHistoricoPesquisas() {
  localStorage.removeItem("historicoPesquisas");
  exibirHistoricoPesquisas();
}
