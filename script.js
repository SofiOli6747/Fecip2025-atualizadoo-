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
