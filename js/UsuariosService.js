export default class UsuariosService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async listarUsuarios() {
    try {
      console.log('Fazendo requisição para:', this.apiUrl);
      const resposta = await fetch(this.apiUrl);
      
      if (!resposta.ok) {
        console.error('Erro na resposta:', resposta.status, resposta.statusText);
        throw new Error(`Erro ao buscar usuários: ${resposta.status}`);
      }
      
      const dados = await resposta.json();
      console.log('Dados recebidos:', dados);
      return dados;
    } catch (erro) {
      console.error('[UsuariosService] Falha:', erro);
      throw erro;
    }
  }
}
