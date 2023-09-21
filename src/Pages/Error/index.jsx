import { Container } from "react-bootstrap";
import Header from "../../Components/Header";

export const Error = () => {
  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "Grid",
            justifyContent: "center",
            textAlign: "center",
            margin: "150px",
          }}
        >
          <h1>
            <strong>Erro 404: Página não encontrada</strong>
          </h1>
          <h3>Esta página está em construção. Em breve teremos novidades!</h3>
        </div>
      </Container>
    </>
  );
};
