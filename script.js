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


//---------

//código para encaminhar o usuário para sua respectiva tela

function selecionarCliente(params) {
  window.location.href = "cliente.html";
}

function selecionarMedico(params) {
  window.location.href = "pagina medico/medico.html";
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
    const res = await fetch(`http://localhost:3000/autocomplete?termo=${termo}`);
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

document.getElementById("botaoBuscar").addEventListener("click", () => {
  const termo = document.getElementById("searchInput").value;
  window.location.href = `medicamentos.html?termo=${encodeURIComponent(termo)}`;
});

document.getElementById("botaoBuscar2").addEventListener("click", () => {
  const sintoma = document.getElementById("sintomaInput").value;
  window.location.href = `medicamentos-sintomas.html?sintoma=${encodeURIComponent(sintoma)}`;
});
