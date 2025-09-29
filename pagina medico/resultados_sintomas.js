const queryParams = new URLSearchParams(window.location.search);
const sintoma = queryParams.get("sintoma");
console.log("yuri")
let id_sintomaa = [];
let id_causaa = [];


 fetch(`/sintomas`, {
          headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(dados2 => {
          dados2.forEach(item => {
            id_sintomaa = item.id_sintoma
            console.log(id_sintomaa);
          })
           fetch(`http://localhost:3000/causas_comuns`, {
          headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(dados3 => {
          dados3.forEach(item => {
            id_causaa = item.id_causa
            console.log(id_causaa);
          })

          const url = sintoma
          ? `/sintomas_medicamentos/sintoma?sintoma=${encodeURIComponent(sintoma)}`
          : `/sintomas_medicamentos/sintoma`;

fetch(url)
  .then(res => res.json())
  .then(dados => {
    console.log(dados);
    const tableBody = document.getElementById("empanada");
     if (tableBody) {
      console.log("achou");
    }else{
      console.log("não achou");
    }
    tableBody.innerHTML = ""; // Limpa a tabela antes de adicionar novas linhas

    if (dados.length === 0) {
      const linha = document.createElement("tr");
      linha.innerHTML = `<td colspan="6">Nenhum resultado encontrado.</td>`;
      tableBody.appendChild(linha);
      return;
    }
    let celulasantigas = [];

      dados.forEach((item, i) => {
        console.log(dados2[i]);
        console.log(dados3[i]);
        const linha = document.createElement('tr');
        linha.innerHTML = `
        <td contenteditable="false" id = ${dados2[i]}>${item.sintoma}</td> 
        <td contenteditable="false"id = ${dados3[i]}>${item.causas_comuns}</td> 
        <td contenteditable="false">${item.medicamentos}</td>
         `;
        tableBody.appendChild(linha);
       
           document.getElementById("b-editarF").addEventListener("click", () => {
            celulasantigas = Array.from(linha.querySelectorAll("td")).map(c => ({
              id: c.id,
              texto: c.textContent.trim()
            }));
            document.getElementById("b-salvarF").style.display = "block";
        linha.innerHTML = `
        <td contenteditable="true" id = ${dados2[i].id_sintoma}>${item.sintoma}</td>
         <td contenteditable="true" id = ${dados3[i].id_causa}>${item.causas_comuns}</td>
      `
        })
       
          document.getElementById("b-salvarF").addEventListener("click", () =>{
            const celulas = Array.from(linha.querySelectorAll("td")).map(c => ({
              id: c.id,
              texto: c.textContent.trim()
            }));
            console.log(celulas);
  
            const dadosEditados = {
              sintoma: celulas[0].texto,
              sintoma_id: celulas[0].id,
              causa: celulas[0].texto,
              causa_id: celulas[0].id
              //sintoma_antigo: celulasantigas[0].texto,
              //id_sintomaa: id_sintomaa
            };
            console.log(dadosEditados);

        fetch(`/sintomas_medicamentos/atualizar`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosEditados)
        })
        .then(res => res.json())
        .then(msg => console.log("modificações salvas com sucesso!", msg))
        .catch(err => {
          console.error("Erro ao atualizar:", err);
          //alert("Erro ao salvar edição.");
        });
        })
      })
    })
  })
}) 
  .catch(err => {
    console.error("Erro ao buscar dados:", err);
    const tableBody = document.querySelector(".pricing-table tbody");
    tableBody.innerHTML = `<tr><td colspan="6">Erro ao carregar os dados.</td></tr>`;
  });





  