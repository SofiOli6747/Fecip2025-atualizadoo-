const queryParams = new URLSearchParams(window.location.search);
const termo = queryParams.get("termo");

fetch(`http://localhost:5500/medicamento?termo=${termo}`)
  .then(res => res.json())
  .then(dados => {
    const container = document.getElementById("resultadoContainer");

    if (dados.length === 0) {
      container.innerHTML = "<p>Nenhum resultado encontrado.</p>";
      return;
    }

    const tableBody = document.querySelector(".pricing-table tbody");

    tableBody.innerHTML = ""; // limpa ela antes de adicionar novas linhas (a gente quer atualizar, não acumular)
 // Linhas de dados (rodando várias vezes, uma vez pra cada item que encontrar em "dados"
    
    //divPreco.textContent = "R$ " + parseFloat(m.preco).toFixed(2);
   
    dados.forEach(m => { 
      const linha = document.createElement("tr"); //criamos um elemento tr (linha de tabela) pra inserir no html
      linha.innerHTML = `
          <td>${m.nome}</td>
          <td>${m.categoria}</td>
          <td>${m.marca}</td>
          <td>R$ ${m.preco}</td>
          <td>${m.farmacia || ""}</td>
          <td>${m.receita_medica}</td>
`;
      //acima, acabamos de criar vários elementos colunas (td) dentro do tr
      tableBody.appendChild(linha); // aqui a gente insere a linha com colunas na nossa tabela que tá lá no medicamentos.html
      });


    // Cria a tabela
     //const tabela = document.createElement("table");
     //tabela.style.borderCollapse = "collapse";
     //tabela.style.width = "100%";

    // Cabeçalho
    //const cabecalho = tabela.insertRow();
    //["Nome", "Categoria", "Preço"].forEach(titulo => {
      // const th = document.createElement("th");
      // th.textContent = titulo;
      // th.style.border = "1px solid #ccc";
      // th.style.padding = "8px";
      // th.style.backgroundColor = "#f2f2f2";
      // cabecalho.appendChild(th);
    // });

    // Linhas de dados
   // dados.forEach(item => {
     // const linha = tabela.insertRow();
     // [item.nome, item.categoria, item.preco].forEach(valor => {
      //  const td = document.createElement("td");
      //  td.textContent = valor ?? "—";
      //  td.style.border = "1px solid #ccc";
      //  td.style.padding = "8px";
     //   linha.appendChild(td);
     // });
    //});

    //container.innerHTML = ""; // Limpa antes de inserir
    //container.appendChild(tabela);
  });



