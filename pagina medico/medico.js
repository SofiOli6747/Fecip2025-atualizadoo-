//codigo pra abrir e fechar a tela de Sair/Voltar

document.getElementById("b-sairr").addEventListener('click', function(){ //evento "click"
   
    document.getElementById("form-loginn").style.display = "block"; //mostra a tela de login
    document.getElementById("blur-bg").style.display = "block";

});
// document.getElementById("close-btn").addEventListener('click', function(){
    
//     document.getElementById("form-loginn").style.display = "none"; //fecha a tela de login
//     document.getElementById("blur-bg").style.display = "none";

// });
// document.getElementById("close-btn2").addEventListener('click', function(){
    
//     document.getElementById("form-cadastro").style.display = "none";
//     document.getElementById("blur-bg").style.display = "none";

// });
const token = localStorage.getItem("token");
if(token){
  console.log(token);
  fetch("/medico/dados", {
    headers: {
      "Authorization": "Bearer " + token
    },
  })
  .then(response => response.json())
  .then(data => {
      const nome = data.nome[0].nome;
      console.log(nome);
      document.getElementById("bvm").innerHTML = `Bem-vindo ao FarmaBusca <span style="font-weight:bold; font-family:'Arial'; color:#2a2a2a;">${nome}</span>`;
      document.getElementById("bvm").style.left = "450px"
      document.getElementById("bvm").style.top = "200px"
    
    console.log("resposta do servidor:", data)
  })
}

const sair = document.getElementById("btn-sair")
sair.addEventListener("click", () => {
  localStorage.removeItem('token');
  alert("Sua conta foi deslogada com sucesso.")
  console.log("token destruido");
  //window.location.href = "Fecip2025/index.html";

})

const voltar = document.getElementById("b-voltar")
voltar.addEventListener("click", () => {
     
    document.getElementById("form-loginn").style.display = "none"; //mostra a tela de login
    document.getElementById("blur-bg").style.display = "none";

})
  
  


//código para encaminhar o usuário para sua respectiva tela

// function selecionarCliente(params) {
//   window.location.href = "cliente copy.html";
// }

// function selecionarMedico(params) {
//   window.location.href = "medico.html";
// }



function selecionarMed(params) {
  window.location.href = "medicamentos.html";
}
function selecionarSint(params) {
  window.location.href = "medicamentos-sintomas.html";
}
function selecionarlojas(params) {
  window.location.href = "lojas.html";
}


document.getElementById("botaoBuscar").addEventListener("click", () => {
  const termo = document.getElementById("searchInput").value;
  window.location.href = `medicamentos.html?termo=${encodeURIComponent(termo)}`;
});




