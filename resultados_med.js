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

// Se houver termo, busca filtrada; senão, busca todos os medicamentos
const url = termo
  ? `http://localhost:5500/medicamento?termo=${encodeURIComponent(termo)}`
  : `http://localhost:5500/medicamento`;

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

