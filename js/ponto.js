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
