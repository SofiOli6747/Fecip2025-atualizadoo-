//codigo pra abrir e fechar a tela de cadastro/login >>PÁGINA INDEX-MEDICO<<
document.getElementById("btn_medico").addEventListener('click', function(){ //evento "click"
   
    document.getElementById("form-loginM").style.display = "block"; //mostra a tela de login
    document.getElementById("blur-bg").style.display = "block";

});
document.getElementById("close-btn").addEventListener('click', function(){
    
    document.getElementById("form-loginM").style.display = "none"; //fecha a tela de login
    document.getElementById("blur-bg").style.display = "none";

});
document.getElementById("close-btn2").addEventListener('click', function(){
    
    document.getElementById("form-cadastroM").style.display = "none";
    document.getElementById("blur-bg").style.display = "none";

});

//alternar tela de cadastro e login 

function toggleForms() {
    const loginForm = document.getElementById('form-loginM');  //definição de constantes
    const registerForm = document.getElementById('form-cadastroM'); 
    
    if (loginForm.style.display === 'none') { //se a tela de login não estive na tela, ela aparece e a tela de cadastro some 
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {                                    // senão, fecha a tela de login e mostra a tela de cadastro 
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}



//código para encaminhar o usuário para sua respectiva tela

function selecionarCliente(params) {
  window.location.href = "cliente.html";
}

// function selecionarMedico(params) {
//   window.location.href = "medico.html";
// }



//cadastro


function enviarCadastroM() {
  const nome = document.getElementById("nomeeM").value.trim();
  const email = document.getElementById("emaillM").value.trim();
  const senha = document.getElementById("senhaaM").value.trim();
  const cpf = document.getElementById("cpf").value.trim();

  if (!nome || !email || !senha || !cpf) {
    alert("Preencha todos os campos.");
    return;
  }

  fetch("/medico/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, email, senha, cpf })
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


function enviarLoginM() {
  //const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("emailM").value.trim();
  const senha = document.getElementById("senhaM").value.trim();

  if (!email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  fetch("/medico/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
  })
  .then(response => {
    if (!response.ok) throw new Error("Credenciais inválidas");
    return response.json();

  })
  .then(data => {
    console.log("Token recebido:", data.token);
    alert("login efetuado com sucesso!"); // Mensagem do servidor
    localStorage.setItem("token", data.token);
    console.log(localStorage.getItem("token"));
    console.log("resposta do servidor:", data)

    document.getElementById("form-loginM").style.display = "none"; //fecha a tela de login
    document.getElementById("blur-bg").style.display = "none"; 
    //document.getElementById("bv").textContent = "Bem-vindo ao FarmaBusca" + nome.innerText;
    window.location.href = "pagina medico/medico.html";

  })
  .catch(error => {
    alert("Falha no login: " + error.message);
  });

  
}



