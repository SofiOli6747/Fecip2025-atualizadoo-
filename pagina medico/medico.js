//codigo pra abrir e fechar a tela de Sair/Voltar

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

//código para encaminhar o usuário para sua respectiva tela

function selecionarCliente(params) {
  window.location.href = "cliente.html";
}

function selecionarMedico(params) {
  window.location.href = "medico.html";
}
