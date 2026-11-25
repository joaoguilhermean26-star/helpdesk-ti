import { Navbar, Nav, Container } from "react-bootstrap";

function NavBar({ paginaAtiva, onMudarPagina, bloqueado }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="menu">
      <Container className="flex-wrap gap-2">
        <Navbar.Brand>Helpdesk TI</Navbar.Brand>
        <Nav className="gap-2 flex-row flex-wrap">
          <Nav.Link
            as="button"
            type="button"
            active={paginaAtiva === "form"}
            disabled={bloqueado}
            onClick={() => onMudarPagina("form")}
          >
            Abrir Chamado
          </Nav.Link>
          <Nav.Link
            as="button"
            type="button"
            active={paginaAtiva === "lista"}
            disabled={bloqueado}
            onClick={() => onMudarPagina("lista")}
          >
            Chamados Abertos
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
