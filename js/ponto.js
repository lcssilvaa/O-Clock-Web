const pontoApiUrl = "http://localhost:8080/api/ponto";

document.addEventListener("DOMContentLoaded", function () {

  // Listar todos os registros de ponto
  window.carregarRegistros = function () {
    fetch(pontoApiUrl)
      .then(res => res.json())
      .then(data => {
        const lista = document.getElementById("listaRegistros");
        lista.innerHTML = "";
        data.forEach(r => {
          const li = document.createElement("li");
          li.textContent = `#${r.id} - Usuário ${r.usuarioId || r.usuario?.id} em ${r.dataHoraRegistro}`;
          lista.appendChild(li);
        });
      })
      .catch(err => alert("Erro ao carregar registros: " + err.message));
  };

  // Atualizar registro de ponto
  document.getElementById("formAtualizarPonto").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("idPontoUpdate").value;
    const usuarioId = document.getElementById("usuarioIdUpdate").value;
    const dataHora = new Date(document.getElementById("dataHoraUpdate").value).toISOString();

    fetch(`${pontoApiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId, dataHoraRegistro: dataHora })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao atualizar ponto.");
        alert("Ponto atualizado com sucesso!");
      })
      .catch(err => alert("Erro: " + err.message));
  });

  // Deletar registro de ponto
  document.getElementById("formDeletarPonto").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("idPontoDelete").value;

    fetch(`${pontoApiUrl}/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao deletar ponto.");
        alert("Ponto deletado com sucesso!");
      })
      .catch(err => alert("Erro: " + err.message));
  });

});
