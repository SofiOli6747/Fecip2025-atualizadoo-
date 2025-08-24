const queryParams = new URLSearchParams(window.location.search);
const sintoma = queryParams.get("sintoma");

// Se houver termo, busca filtrada; senão, busca todos os medicamentos

fetch(`http://localhost:5500/medicamentos-sintoma?sintoma=${sintoma}`)
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
        <td>${m.sintomas_causas}</td>
        <td>${m.nome}</td>
        <td>${m.marca}</td>
        <td>R$ ${parseFloat(m.preco).toFixed(2)}</td>
      `;
      tableBody.appendChild(linha);
    });

  })
  .catch(err => {
    console.error("Erro ao buscar dados:", err);
    const tableBody = document.querySelector(".pricing-table tbody");
    tableBody.innerHTML = `<tr><td colspan="6">Erro ao carregar os dados.</td></tr>`;
  });







  