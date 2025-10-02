//codigo pra abrir e fechar a tela de cadastro/login >>PÁGINA CLIENTE<<

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


//cadastro


function enviarCadastro() {
  const nome = document.getElementById("nomee").value.trim();
  const email = document.getElementById("emaill").value.trim();
  const senha = document.getElementById("senhaa").value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  fetch("/cliente/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, email, senha })
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro ao cadastrar");
    return response.text();
  })
  .then(data => {
    alert(data); // Mensagem do servidor
  })
  .catch(error => {
    alert("Falha no cadastro: " + error.message);
  });
}


//login


function enviarLogin() {
  //const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  fetch("/cliente/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Token recebido:", data.token);
    alert("login efetuado com sucesso!"); // Mensagem do servidor
    localStorage.setItem("token", data.token);
    console.log(localStorage.getItem("token"));
    console.log("resposta do servidor:", data)

    document.getElementById("form-loginn").style.display = "none"; //fecha a tela de login
    document.getElementById("blur-bg").style.display = "none"; 
    //document.getElementById("bv").textContent = "Bem-vindo ao FarmaBusca" + nome.innerText;

  })
  .catch(error => {
    alert("Falha no login: " + error.message);
  });

}

const token = localStorage.getItem("token");
if(token){
    fetch("/cliente/dados", {
    headers: {
      "Authorization": "Bearer " + token
    },
  })
  .then(response => response.json())
  .then(data => {
      const nome = data.nome[0].nome;
      console.log(nome);
      document.getElementById("bv").innerHTML = `Bem-vindo ao FarmaBusca <span style="font-weight:bold; font-family:'Arial'; color:#2a2a2a;">${nome}</span>`;
      document.getElementById("bv").style.left = "450px"
      document.getElementById("bv").style.top = "200px"
      document.getElementById("cadastro-txt").innerHTML = `<span style="font-weight:bold; font-family:'Arial'; color:#2a2a2a;">${nome}</span>`;
    
    console.log("resposta do servidor:", data)
  })

}

//logoff 



const sair = document.getElementById("sair")
sair.addEventListener("click", () => {
  localStorage.removeItem('token');
  alert("Sua conta foi deslogada com sucesso.")
  console.log("token destruido");
  document.getElementById("bv").innerHTML = "Bem vindo ao FarmaBusca"
  document.getElementById("bv").style.fontFamily = "Sarala, sans-serif"
  document.getElementById("bv").style.left = "523px"
  document.getElementById("bv").style.top = "220px"
  document.getElementById("bv").style.fontSize = "font-size: 30px;"
})
  



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




//---------

// códigos para quando for clicado em cada uma das opções do início(tela do cliente)

function selecionarMed() {
  window.location.href = "medicamentos.html";

}
function selecionarHist(params) {
  window.location.href = "historico.html";
}
function selecionarlojas(params) {
  window.location.href = "lojas.html";
}


//----------
function mostrarMenu(){
  document.getElementById('searchInput').addEventListener('input', async function () {
    
    const params = new URLSearchParams(window.location.search);
    const termo = params.get("termo");

    const query = this.value.toLowerCase();

    const inputTexto = document.getElementById('searchInput');
    const menuOpcoes = document.getElementById('autocomplete-menu');
    const letraDigitada = inputTexto.value.toLowerCase();

  // Filtra as opções que começam com a letra digitada
    const res = await fetch(`/autocomplete?termo=${termo}`);
    const suggestions = await res.json();
    const opcoesFiltradas = suggestions.filter(opcao => opcao.toLowerCase().startsWith(letraDigitada));

  // Agrupar as opções por inicial
    const grupos = {};

  // Organiza as opções filtradas por inicial
    opcoesFiltradas.forEach(opcao => {
        const inicial = opcao[0].toLowerCase();
        if (!grupos[inicial]) {
          grupos[inicial] = [];
        }
        grupos[inicial].push(opcao);
    });

    opcoesFiltradas.forEach(opcao => {
      let highlighted = "";
      for (let char of opcao) {
        if (query.includes(char.toLowerCase()) ) {
          highlighted += char;
        }
      }
    });

  // Se houver opções filtradas, exibe o menu, caso contrário, esconde
    if (letraDigitada.length > 0 && opcoesFiltradas.length > 0) {
        menuOpcoes.innerHTML = ''; // Limpa o menu antes de adicionar as novas opções
      
        menuOpcoes.style.display = 'block';  // Mostra o menu

      // Cria grupos de opções com base na inicial
        Object.keys(grupos).forEach(inicial => {
            const grupoDiv = document.createElement('div');
            grupoDiv.classList.add('grupoOpcao');

          // Adiciona as opções do grupo
            grupos[inicial].forEach(opcao => {
                const opcaoDiv = document.createElement('div');
                opcaoDiv.textContent = opcao;
                

              // Adiciona evento de clique na opção para fechar o menu
                opcaoDiv.onclick = () => {
                  opcaoSelecionada = opcao;
                  inputTexto.value = opcao; // Preenche o input com a opção selecionada
                  menuOpcoes.style.display = 'none'; // Fecha o menu
              };


              grupoDiv.appendChild(opcaoDiv);
            });

          // Adiciona o grupo de opções ao menu
            menuOpcoes.appendChild(grupoDiv);
        });
    } else {
        menuOpcoes.style.display = 'none';  // Esconde o menu
    }
  });
};




//botões de busca

document.getElementById("botaoBuscar").addEventListener("click", () => {
  const termo = document.getElementById("searchInput").value;
  window.location.href = `medicamentos.html?termo=${encodeURIComponent(termo)}`;
});

document.getElementById("botaoBuscar2").addEventListener("click", () => {
  const sintoma = document.getElementById("sintomaInput").value;
  window.location.href = `medicamentos-sintomas.html?sintoma=${encodeURIComponent(sintoma)}`;
});


function pesquisar1(params) {
  const sintoma = document.getElementById("sintomaInput").value;
  window.location.href = `medicamentos-sintomas.html?sintoma=${encodeURIComponent(sintoma)}`;
}


function pesquisar2(params) {
  const termo = document.getElementById("searchInput").value;
  window.location.href = `medicamentos.html?termo=${encodeURIComponent(termo)}`;
}




//códigos página das farmácias vv




const farmaciasSalvas = JSON.parse(localStorage.getItem("farmaciasSalvas")) || [];

const medicamentosSalvos = JSON.parse(localStorage.getItem("medicamentosSalvos")) || [];

// fetch('/api/google-key')
//   .then(res => res.json())
//   .then(data => {
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${data.key}&loading=async&libraries=places&callback=initMap`;
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);
//   });



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



//código para salvar informações do site (página salvos)



function permitirDrop(event) {
  event.preventDefault();
}

function iniciarArraste(event, farmaciaJson) {
  event.dataTransfer.setData("text/plain", farmaciaJson);
}

function soltarFarmacia(event) {
  event.preventDefault();
  const farmaciaJson = event.dataTransfer.getData("text/plain");
  const farmacia = JSON.parse(farmaciaJson);
  const chaveUnica = `${farmacia.nome}-${farmacia.endereco}`;

  let salvos = JSON.parse(localStorage.getItem("farmaciasSalvas")) || [];
  salvos.push(farmacia);
  localStorage.setItem("farmaciasSalvas", JSON.stringify(salvos));

  if (!salvos.some(f => `${f.nome}-${f.endereco}` === chaveUnica)) {
    salvos.push(farmacia);
    localStorage.setItem("farmaciasSalvas", JSON.stringify(salvos));
  }
  // ✅ Enviar para o banco de dados
    const token = localStorage.getItem("token"); 
    fetch("/cliente/farmacia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(farmacia)
    })
    .then(res => res.text())
    .then(msg => console.log("Farmácia salva no banco:", msg))
    .catch(err => console.error("Erro ao salvar no banco:", err));
   if(!token){
      alert("Você tem que estar logado para salvas itens!");
  } 
}


function salvos(params) {
  window.location.href = "salvos.html";
}

function verificarLoginSalvos(params) {
  if(!token){
      alert("Você tem que estar logado para ver seus itens salvos!");
      window.location.href = "cliente.html";
  }
  
}


function exibirFarmaciasSalvas() {
  const container = document.getElementById("listaSalvos");
  if(container){
    container.innerHTML = "";
    

  const token = localStorage.getItem("token");

  fetch("/cliente/dados", {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  .then(res => res.json())
  .then(data => {
    const salvos = data.farmacias || [];

    if (salvos.length === 0) {
      container.innerHTML = "<p>Nenhuma farmácia salva ainda.</p>";
      return;
    }

    salvos.forEach(farmacia => {
      const chaveUnica = `${farmacia.nome}-${farmacia.endereco}`;
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>💊 ${farmacia.nome}</strong><br>
        📍 ${farmacia.endereco}<br>
        🆔 ${farmacia.placeId}<hr>
        <button onclick="removerFarmacia('${chaveUnica}')">🗑️ Remover</button>
      `;
      container.appendChild(div);
    });
  });
}

}



function removerFarmacia(chaveUnica) {
  let salvos = JSON.parse(localStorage.getItem("farmaciasSalvas")) || [];

  // Remove a farmácia com o ID correspondente
  salvos = salvos.filter(f => `${f.nome}-${f.endereco}` !== chaveUnica);

  // Atualiza o localStorage
  localStorage.setItem("farmaciasSalvas", JSON.stringify(salvos));

  // Atualiza a exibição
  const container = document.getElementById("listaSalvos");

  container.remove();
}



function exibirMedicamentosSalvos() {
  const container = document.getElementById("listaSalvos2");
  const salvoss = JSON.parse(localStorage.getItem("medicamentosSalvos")) || [];
  
  const token = localStorage.getItem("token");
  console.log(token)

  fetch("/cliente/dados", {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  .then(res => res.json())
  .then(data => {
    const salvos = data.medicamentos || [];
    if (salvos.length === 0) {
    container.innerHTML = "<p>Nenhum medicamento salvo ainda.</p>";
    return;
  }

  salvos.forEach(medicamento => {
    const chaveUnica = `${medicamento.nome}-${medicamento.codigo}`;
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>💊 ${medicamento.nome}</strong><br>
      🏭 Marca: ${medicamento.marca}<br>
      💵 Preço: ${medicamento.preco || "Não informado"}<hr>
      <button onclick="removerMedicamento('${chaveUnica}')">🗑️ Remover</button>
    `;
    container.appendChild(div);
  }) 
})

}






function removerMedicamento(chaveUnica) {
  let salvos = JSON.parse(localStorage.getItem("medicamentosSalvos")) || [];

  salvos = salvos.filter(m => `${m.nome}-${m.codigo}` !== chaveUnica);

  localStorage.setItem("medicamentosSalvos", JSON.stringify(salvos));

  const token = localStorage.getItem("token");

  fetch("/cliente/removerMed", {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  .then(res => res.json())

  const container = document.getElementById("listaSalvos2");

  container.remove();

  //exibirMedicamentosSalvos();
}





//código para o histórico 


function registrarHistoricoPesquisa() {

  const termo = document.getElementById("searchInput").value.trim();

  console.log("aaa");

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
    fetch("/cliente/historico", {
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

    fetch("/cliente/dados", {
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

    if(!token){
      const div = document.createElement("div");
      div.innerHTML = "Faça Login para ver seu hitórico de buscas!"
    }

    console.log(historico);
    historico.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>🔍 <strong>Pesquisa:</strong> ${item.busca}<br>
        🕒 <em>${item.data_pesquisa}</em></p>
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



document.addEventListener("DOMContentLoaded", () => {
  exibirFarmaciasSalvas();
});

function enviarFormulario(params) {
  const email = document.getElementById("email").value.trim();
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const formulario = document.getElementById("feedback").value.trim();

  fetch("/formularios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, nome, telefone, formulario})
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro ao enviar");
    return response.text();
  })
  .then(data => {
    alert(data); // Mensagem do servidor
  })
  .catch(error => {
    alert("Falha no envio: " + error.message);
  });
}

function destruirToken() {
  localStorage.removeItem('token');
}