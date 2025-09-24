//codigo pra abrir e fechar a tela de Sair/Voltar

document.getElementById("b-sair").addEventListener('click', function(){ //evento "click"
   
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

//código para encaminhar o usuário para sua respectiva tela

function selecionarCliente(params) {
  window.location.href = "cliente copy.html";
}

function selecionarMedico(params) {
  window.location.href = "medico.html";
}



function selecionarMed(params) {
  window.location.href = "medicamentos.html";
}
function selecionarHist(params) {
  window.location.href = "historico.html";
}
function selecionarlojas(params) {
  window.location.href = "lojas.html";
}


document.getElementById("botaoBuscar").addEventListener("click", () => {
  const termo = document.getElementById("searchInput").value;
  window.location.href = `medicamentos.html?termo=${encodeURIComponent(termo)}`;
});
