
//codigo pra abrir e fechar a tela de cadastro/login

document.getElementById("botao-cadastro").addEventListener('click', function(){
   
    document.getElementById("form-loginn").style.display = "block";
    document.getElementById("blur-bg").style.display = "block";

});
document.getElementById("close-btn").addEventListener('click', function(){
    
    document.getElementById("form-loginn").style.display = "none";
    document.getElementById("blur-bg").style.display = "none";

});

//alternar tela de cadastro e login 

function toggleForms() {
    const loginForm = document.getElementById('form-loginn');
    const registerForm = document.getElementById('form-cadastro');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}


