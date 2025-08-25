const queryParams = new URLSearchParams(window.location.search);
const termo = queryParams.get("termo");

function destacarLetras(texto, termo) {
  const letrasBusca = termo.toLowerCase().split("");
  return texto
    .split("")
    .map(letra => {
      return letrasBusca.includes(letra.toLowerCase())
        ? `<span class="highlight">${letra}</span>`
        : letra;
    })
    .join("");
}


const url = termo
  ? `http://localhost:3000/medicamento/termo?termo=${encodeURIComponent(termo)}`
  : `http://localhost:3000/medicamento/termo`;

fetch(url)
  .then(res => res.json())
  .then(dados => {
    const tableBody = document.querySelector(".pricing-table tbody");
    tableBody.innerHTML = ""; // Limpa a tabela antes de adicionar novas linhas

    if (dados.length === 0) {
      const linha = document.createElement("tr");
      linha.innerHTML = `<td colspan="6">Nenhum resultado encontrado.</td>`;
      tableBody.appendChild(linha);
      return;
    }

    dados.forEach(m => {
      const linha = document.createElement("tr");
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





  function filtrarPorMarca() {
    const marcaSelecionada = document.getElementById("select-marca").value;
    const url = marcaSelecionada
    ? `http://localhost:3000/medicamento/marca?marca=${encodeURIComponent(marcaSelecionada)}`
    : `http://localhost:3000/medicamento/termo`;

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



