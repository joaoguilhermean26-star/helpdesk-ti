function ListaChamados({ chamados, loading, erro }) {
  return (
    <section className="card shadow-sm">
      <div className="card-body p-4">
        <h1 className="h3">Chamados Abertos</h1>
        <p className="text-secondary">Acompanhe as solicitações de suporte registradas.</p>
        {loading ? (
          <p role="status">Carregando chamados...</p>
        ) : erro ? (
          <p role="alert" className="alert alert-danger">{erro}</p>
        ) : chamados.length === 0 ? (
          <p className="text-secondary">Nenhum chamado registrado.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Solicitante</th>
                  <th>Setor</th>
                  <th>Tipo</th>
                  <th>Descrição</th>
                  <th>Prioridade</th>
                </tr>
              </thead>
              <tbody>
                {chamados.map((chamado) => (
                  <tr key={chamado.id}>
                    <td>{chamado.solicitante}</td>
                    <td>{chamado.setor}</td>
                    <td>{chamado.tipo}</td>
                    <td className="descricao">{chamado.descricao}</td>
                    <td>
                      <span className={`badge ${chamado.prioridade === "Alta" ? "text-bg-danger" : chamado.prioridade === "Média" ? "text-bg-warning" : "text-bg-success"}`}>
                        {chamado.prioridade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default ListaChamados;
