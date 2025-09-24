const queryParams = new URLSearchParams(window.location.search);
const termo = queryParams.get("termo");

function destacarLetras(texto, termo) {
  if(termo){
    const letrasBusca = termo.toLowerCase().split("");
    return texto
    .split("")
    .map(letra => {
      return letrasBusca.includes(letra.toLowerCase())
        ? `<span class="highlight">${letra}</span>`
        : letra;
    })
    .join("");
  }else{
      return texto
  }
}

//exibir todos os resultados na página de medicamentos equivalentes a letra/palavra digitada na barra de pesquisa
const url = termo
  ? `http://localhost:3000/medicamento/termo?termo=${encodeURIComponent(termo)}`
  : `http://localhost:3000/medicamento/termo`;

fetch(url)
  .then(res => res.json())
  .then(dados => {
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


    dados.forEach(m => {
      const medicamentos = { 
              nome: m.nome,
              marca: m.marca,
              preco: m.preco,
              receita_medica: m.receita_medica
            };
      const linha = document.createElement("tr");
      linha.draggable = true;
      linha.ondragstart = (event) => {
              const medicamentoJson = JSON.stringify(medicamentos); // ✅ transforma em JSON
              event.dataTransfer.setData("text/plain", medicamentoJson);
            };
      linha.innerHTML = `
        <td>${destacarLetras(m.nome, termo)}</td>
        <td>${m.categoria}</td>
        <td>${m.marca}</td>
        <td>R$ ${parseFloat(m.preco).toFixed(2)}</td>
        <td>${m.farmacia || ""}</td>
        <td>
        <span class="${m.receita_medica === 'sim' ? 'receita-sim' : 'receita-nao'}">
          ${m.receita_medica}
        </span>
        </td>
      `;
      tableBody.appendChild(linha);
    });

  })
  .catch(err => {
    console.error("Erro ao buscar dados:", err);
    const tableBody = document.querySelector(".pricing-table tbody");
    tableBody.innerHTML = `<tr><td colspan="6">Erro ao carregar os dados.</td></tr>`;
  });


//filtros para o resultado das pesquisas 


  function filtrarPorMarca() {
    const marcaSelecionada = document.getElementById("select-marca").value;
    const url = marcaSelecionada
    ? `http://localhost:3000/medicamento/marca?marca=${encodeURIComponent(marcaSelecionada)}` //se a marca selecionada for X ele retornará todos medicamentos relacionados a marca X
    : `http://localhost:3000/medicamento/termo`; //senão ele retorna todos os medicamentos

    console.log(marcaSelecionada);
    
    fetch(url)
    .then(res => res.json())
    .then(dados => {
        const tableBody = document.querySelector(".pricing-table tbody");
        tableBody.innerHTML = "";

        if (dados.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4">Nenhum medicamento encontrado para a marca "${marcaSelecionada}".</td></tr>`;
            return;
        }

        dados.forEach(m => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
            <td>${m.nome}</td>
            <td>${m.categoria}</td>
            <td>${m.marca}</td>
            <td>R$ ${parseFloat(m.preco).toFixed(2)}</td>
            <td>
                <span class="${m.receita_medica === 'sim' ? 'receita-sim' : 'receita-nao'}">
                 ${m.receita_medica}
                </span>
            </td>
            `;
         tableBody.appendChild(linha);
        });
        })
     .catch(err => {
        console.error("Erro ao buscar medicamentos:", err);
        const tableBody = document.querySelector(".pricing-table tbody");
        tableBody.innerHTML = `<tr><td colspan="4">Erro ao carregar os dados.</td></tr>`;
        });
}



function filtrarPorCategoria() {
    const categoriaSelecionada = document.getElementById("select-categoria").value;
    const url = categoriaSelecionada
    ? `http://localhost:3000/medicamento/categoria?categoria=${encodeURIComponent(categoriaSelecionada)}`
    : `http://localhost:3000/medicamento/termo`;
    
    
    

    fetch(url)
    .then(res => res.json())
    .then(dados => {
        const tableBody = document.querySelector(".pricing-table tbody");
        tableBody.innerHTML = "";

        if (dados.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4">Nenhum medicamento encontrado para a marca "${categoriaSelecionada}".</td></tr>`;
            return;
        }

        dados.forEach(m => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
            <td>${m.nome}</td>
            <td>${m.categoria}</td>
            <td>${m.marca}</td>
            <td>R$ ${parseFloat(m.preco).toFixed(2)}</td>
            <td>
                <span class="${m.receita_medica === 'sim' ? 'receita-sim' : 'receita-nao'}">
                 ${m.receita_medica}
                </span>
            </td>
            `;
         tableBody.appendChild(linha);
        });
        })
     .catch(err => {
        console.error("Erro ao buscar medicamentos:", err);
        const tableBody = document.querySelector(".pricing-table tbody");
        tableBody.innerHTML = `<tr><td colspan="4">Erro ao carregar os dados.</td></tr>`;
        });
}



function filtrarPorPreco() {
    const precoSelecionada = document.getElementById("select-preco").value;
      let url;
    
      if (precoSelecionada === "todas") {
        url = "http://localhost:3000/medicamento/termo"; // endpoint que retorna todos
      } else {
        const [min, max] = precoSelecionada.split("-").map(Number);
        url = `http://localhost:3000/medicamento/preco?min=${min}&max=${max}`;
      }

      console.log(precoSelecionada);
    
    fetch(url)
    .then(res => res.json())
    .then(dados => {
        console.log(dados);
        const tableBody = document.querySelector(".pricing-table tbody");
        tableBody.innerHTML = "";

        if (dados.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4">Nenhum medicamento encontrado para a marca "${precoSelecionada}".</td></tr>`;
            return;
        }

        dados.forEach(m => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
            <td>${m.nome}</td>
            <td>${m.categoria}</td>
            <td>${m.marca}</td>
            <td>R$ ${parseFloat(m.preco).toFixed(2)}</td>
            <td>
                <span class="${m.receita_medica === 'sim' ? 'receita-sim' : 'receita-nao'}">
                 ${m.receita_medica}
                </span>
            </td>
            `;
         tableBody.appendChild(linha);
        });
        })
     .catch(err => {
        console.error("Erro ao buscar medicamentos:", err);
        const tableBody = document.querySelector(".pricing-table tbody");
        tableBody.innerHTML = `<tr><td colspan="4">Erro ao carregar os dados.</td></tr>`;
        });
}


//----------




function permitirDrop(event) {
  event.preventDefault();
}

function iniciarArraste(event, medicamentoJson) {
  event.dataTransfer.setData("text/plain", medicamentoJson);
}

function soltarMedicamento(event) {
  event.preventDefault();
  const medicamentoJson = event.dataTransfer.getData("text/plain");
  const medicamento = JSON.parse(medicamentoJson);
  const chaveUnica = `${medicamento.nome}-${medicamento.codigo}`;

  let salvos = JSON.parse(localStorage.getItem("medicamentosSalvos")) || [];

  // Evita duplicatas
  if (!salvos.some(m => `${m.nome}-${m.codigo}` === chaveUnica)) {
    salvos.push(medicamento);
    localStorage.setItem("medicamentosSalvos", JSON.stringify(salvos));
  }
  const token = localStorage.getItem("token"); 
    fetch("http://localhost:3000/cliente/medicamento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(medicamento)
    })
    .then(res => res.text())
    .then(msg => console.log("medicamento salva no banco:", msg))
    .catch(err => console.error("Erro ao salvar no banco:", err));
}

function irParaSalvos() {
  window.location.href = "salvos.html";
}










