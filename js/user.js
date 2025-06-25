const userApiUrl = "http://localhost:8080/api/users";

function carregarUsuarios() {
  fetch(userApiUrl)
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById("listaUsuarios");
      lista.innerHTML = "";
      data.forEach(u => {
        const li = document.createElement("li");
        li.textContent = `${u.id}: ${u.nome} (${u.email})`;
        lista.appendChild(li);
      });
    });
}

document.getElementById("formUsuario").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("senha").value;

  fetch(userApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, cpf, senha })
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao cadastrar usuário.");
      return res.json();
    })
    .then(() => {
      carregarUsuarios();
      document.getElementById("formUsuario").reset();
    })
    .catch(err => alert(err.message));
});

document.getElementById("formUpdateUsuario").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("idUpdate").value;
  const nome = document.getElementById("nomeUpdate").value;
  const email = document.getElementById("emailUpdate").value;
  const cpf = document.getElementById("cpfUpdate").value;
  const senha = document.getElementById("senhaUpdate").value;

  fetch(`${userApiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, cpf, senha })
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao atualizar.");
      return res.json();
    })
    .then(() => {
      alert("Usuário atualizado!");
      carregarUsuarios();
      document.getElementById("formUpdateUsuario").reset();
    })
    .catch(err => alert(err.message));
});


carregarUsuarios();
