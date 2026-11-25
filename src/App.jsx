import { useEffect, useState } from "react";
import NavBar from "./components/NavBar.jsx";
import FormChamado from "./components/FormChamado.jsx";
import ListaChamados from "./components/ListaChamados.jsx";
import "./App.css";

const URL = "http://localhost:3000/chamados";

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState("lista");
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  // Busca inicial: não executa novamente ao trocar de aba.
  useEffect(() => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) throw new Error("Erro na consulta");
        return res.json();
      })
      .then((dados) => setChamados(dados))
      .catch(() => setErro("Não foi possível carregar os chamados. Verifique o JSON Server e recarregue a página."))
      .finally(() => setLoading(false));
  }, []);

  async function cadastrarChamado(chamado) {
    setEnviando(true);
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chamado)
      });

      if (!res.ok) throw new Error("Erro ao cadastrar");
      const novoChamado = await res.json();

      // Acrescenta o registro retornado pelo servidor, sem novo GET.
      setChamados((prev) => [...prev, novoChamado]);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <NavBar paginaAtiva={paginaAtiva} onMudarPagina={setPaginaAtiva} bloqueado={enviando} />
      <main className="container painel">
        {paginaAtiva === "form" && (
          <FormChamado
            onCadastrar={cadastrarChamado}
            onMudarPagina={setPaginaAtiva}
            enviando={enviando}
            bloqueado={loading || !!erro}
            erroConsulta={erro}
          />
        )}
        {paginaAtiva === "lista" && (
          <ListaChamados chamados={chamados} loading={loading} erro={erro} />
        )}
      </main>
    </>
  );
}

export default App;
