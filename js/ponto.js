const pontoApiUrl = "http://localhost:8080/api/ponto/bater";

document.getElementById("formPonto").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("idUsuarioPonto").value;
  const dataHora = document.getElementById("dataHora").value;

  fetch(`${pontoApiUrl}/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dataHoraRegistro: dataHora })
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao bater ponto.");
      return res.json();
    })
    .then(() => {
      document.getElementById("msgPonto").textContent = "Ponto registrado com sucesso!";
      document.getElementById("formPonto").reset();
    })
    .catch(err => {
      document.getElementById("msgPonto").textContent = "Erro: " + err.message;
    });
});

// Listar todos os registros de ponto
function carregarRegistros() {
  fetch(pontoApiUrl)
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById("listaRegistros");
      lista.innerHTML = "";
      data.forEach(r => {
        const li = document.createElement("li");
        li.textContent = `#${r.id} - Usuário ${r.usuarioId} em ${r.dataHoraRegistro}`;
        lista.appendChild(li);
      });
    })
    .catch(err => alert("Erro ao carregar registros: " + err.message));
}

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
    .catch(err => alert(err.message));
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
    .catch(err => alert(err.message));
});
