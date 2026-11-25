import { useState } from "react";

function FormChamado({ onCadastrar, onMudarPagina, enviando, bloqueado, erroConsulta }) {
  const [solicitante, setSolicitante] = useState("");
  const [setor, setSetor] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (enviando || bloqueado) return;
    setErro("");

    if (solicitante.trim().length < 3) {
      setErro("O nome deve ter pelo menos 3 caracteres.");
      return;
    }
    if (descricao.trim().length < 10) {
      setErro("A descrição deve ter pelo menos 10 caracteres.");
      return;
    }
    if (!setor || !tipo || !prioridade) {
      setErro("Selecione o setor, o tipo e a prioridade.");
      return;
    }

    const chamado = {
      solicitante: solicitante.trim(),
      setor,
      tipo,
      descricao: descricao.trim(),
      prioridade
    };

    try {
      await onCadastrar(chamado);
      setSolicitante("");
      setSetor("");
      setTipo("");
      setDescricao("");
      setPrioridade("");
      onMudarPagina("lista");
    } catch {
      setErro("Não foi possível abrir o chamado. Tente novamente.");
    }
  }

  return (
    <section className="card shadow-sm formulario">
      <div className="card-body p-4">
        <h1 className="h3">Abrir Chamado</h1>
        <p className="text-secondary">Preencha os dados para solicitar suporte técnico.</p>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={enviando}>
            <div className="mb-3">
              <label htmlFor="solicitante" className="form-label">Nome do Solicitante</label>
              <input id="solicitante" className="form-control" type="text" required minLength={3}
                value={solicitante} onChange={(e) => setSolicitante(e.target.value)} />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="setor" className="form-label">Setor</label>
                <select id="setor" className="form-select" required value={setor} onChange={(e) => setSetor(e.target.value)}>
                  <option value="">Selecione o setor</option>
                  <option>TI</option>
                  <option>RH</option>
                  <option>Financeiro</option>
                  <option>Operações</option>
                  <option>Comercial</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="tipo" className="form-label">Tipo de Problema</label>
                <select id="tipo" className="form-select" required value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value="">Selecione o tipo</option>
                  <option>Hardware</option>
                  <option>Software</option>
                  <option>Rede</option>
                  <option>Acesso</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição do Problema</label>
              <textarea id="descricao" className="form-control" rows={4} required minLength={10}
                value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="prioridade" className="form-label">Prioridade</label>
              <select id="prioridade" className="form-select" required value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                <option value="">Selecione a prioridade</option>
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </select>
            </div>
            {(erro || erroConsulta) && <p role="alert" className="alert alert-danger">{erro || erroConsulta}</p>}
            <button type="submit" className="btn btn-primary w-100" disabled={enviando || bloqueado}>
              {enviando ? "Enviando..." : "Abrir Chamado"}
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default FormChamado;
