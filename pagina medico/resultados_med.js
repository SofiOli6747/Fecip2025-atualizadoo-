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
  ? `/medicamento/termo?termo=${encodeURIComponent(termo)}`
  : `/medicamento/termo`;

fetch(url)
  .then(res => res.json())
  .then(dados => {
    const tableBody = document.getElementById("emponoda");
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
              receita_medica: m.receita_medica,
              id_medicamento: m.id_medicamento
            };
      const linha = document.createElement("tr");
      linha.draggable = true;
      linha.ondragstart = (event) => {
              const medicamentoJson = JSON.stringify(medicamentos); // ✅ transforma em JSON
              event.dataTransfer.setData("text/plain", medicamentoJson);
            };
      linha.innerHTML = `
        <td contenteditable="false">${destacarLetras(m.nome, termo)}</td>
        <td contenteditable="false">${m.categoria}</td>
        <td contenteditable="false">${m.marca}</td>
        <td contenteditable="false">R$ ${parseFloat(m.preco).toFixed(2)}</td>
        <td contenteditable="false">
        <span class="${m.receita_medica === 'sim' ? 'receita-sim' : 'receita-nao'}">
          ${m.receita_medica}
        </span>
        </td>
      `;
      tableBody.appendChild(linha);


      document.getElementById("b-editar").addEventListener("click", () => {
        document.getElementById("b-salvarM").style.display = "block";
        linha.innerHTML = `
        <td contenteditable="true">${m.nome}</td>
        <td contenteditable="true">${m.categoria}</td>
        <td contenteditable="true">${m.marca}</td>
        <td contenteditable="true">${m.preco}</td>
        <td contenteditable="true">${m.receita_medica}</td>
      `
      })

      document.getElementById("b-salvarM").addEventListener("click", () =>{
        const celulas = linha.querySelectorAll("td");
  
        const dadosEditados = {
          nome: celulas[0].textContent.trim(),
          categoria: celulas[1].textContent.trim(),
          marca: celulas[2].textContent.trim(),
          preco: parseFloat(celulas[3].textContent.replace("R$", "").trim()),
          receita_medica: celulas[4].textContent.trim(),
          id_medicamento: m.id_medicamento
        };

        fetch(`/medicamento/atualizar`, {
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
    ? `/medicamento/marca?marca=${encodeURIComponent(marcaSelecionada)}` //se a marca selecionada for X ele retornará todos medicamentos relacionados a marca X
    : `/medicamento/termo`; //senão ele retorna todos os medicamentos

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
            <td>${m.receita_medica === 'sim' ? 'receita-sim' : 'receita-nao'}</td>
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
    ? `/medicamento/categoria?categoria=${encodeURIComponent(categoriaSelecionada)}`
    : `/medicamento/termo`;
    
    
    

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
        url = "/medicamento/termo"; // endpoint que retorna todos
      } else {
        const [min, max] = precoSelecionada.split("-").map(Number);
        url = `/medicamento/preco?min=${min}&max=${max}`;
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


