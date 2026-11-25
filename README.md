# Helpdesk TI

Exercício: Sistema de Abertura de Chamados de TI — HTTP + JSON, NavBar e renderização condicional.

## Executar

Abra esta pasta no VS Code (Node.js 22 recomendado). No terminal:

```sh
npm install
npm run server
```

Em outro terminal, na mesma pasta:

```sh
npm run dev
```

Abra o endereço mostrado pelo Vite (normalmente http://localhost:5173).
O JSON Server fica em http://localhost:3000/chamados. Não é necessário instalar globalmente.

## Como funciona

- App mantém a página ativa, lista, loading, envio e erro de consulta.
- O GET roda na montagem do App, com dependências vazias. A tela inicial é a lista. O main.jsx não utiliza StrictMode para evitar a execução adicional do efeito em desenvolvimento.
- NavBar alterna as telas com props e Nav.Link active, sem rotas.
- FormChamado controla os cinco campos e valida nome (3 caracteres), descrição (10 caracteres) e selects obrigatórios.
- O POST salva no db.json e retorna o chamado com ID. O App acrescenta o retorno com setChamados((prev) => [...prev, novoChamado]). O formulário limpa os campos e muda para a lista, sem novo GET.
- ListaChamados usa map com key por ID, loading, erro e badges coloridos de prioridade (desafio extra).
- CSS próprio e classes Bootstrap, sem estilos inline.
- O hook useFetch opcional não foi implementado para manter o exercício direto.

## Teste manual

1. Confira o chamado inicial de Maria Silva.
2. Abra a aba Abrir Chamado. Tente enviar nome curto, descrição curta ou campo vazio: o cadastro deve ser bloqueado.
3. Cadastre um chamado válido. A lista deve abrir automaticamente e exibir o novo registro.
4. Alterne as abas: não deve haver novo GET na API. Na aba Network do navegador, confira o GET inicial e o POST.
5. Recarregue a página: o novo registro deve continuar no db.json.
6. Com o JSON Server parado, tente cadastrar (após uma carga inicial bem-sucedida): deve aparecer erro e os campos devem permanecer preenchidos.
