import { Container, Spinner } from "react-bootstrap";
import { FormEventos } from "../../Components/FormEventos";
import { useState, useEffect } from "react";
import { TableEvent } from "../../Components/TableEvent";
import { dataBase } from "../../Data/api";
import "./styled.css";
import Header from "../../Components/Header";

function CadEventos() {
  const [actionPage, setActionPage] = useState(true);
  const [listEvents, setListEvents] = useState([]);
  const [erro, setErro] = useState(null);
  const [modEdit, setModEdit] = useState(false);
  const [eventEdit, setEventEdit] = useState({
    title: "",
    setTime: "",
    startDate: "",
    endDate: "",
    city_code: "",
    description: "",
  });

  const action = () => {
    setActionPage(!actionPage);
  };

  function deletEvent(event) {
    fetch(dataBase + "events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    }).then((response) => {
      window.alert("Evento excluido com sucesso!");
      window.location.reload();
      return response.json();
    });
  }

  useEffect(() => {
    fetch(dataBase + "events/simple", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setListEvents(data);
        } else {
          setErro(data);
        }
      });
  }, []);

  function preEdit(e) {
    setModEdit(true);
    setEventEdit(e);
    setActionPage(false);
  }

  if (erro) {
    return (
      <>
        <p>Erro ao obter a lista de eventos do backend: {erro.message}</p>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Container>
          {actionPage ? (
            <TableEvent
              listEvents={listEvents}
              setListEvents={setListEvents}
              alterPage={action}
              preEdit={preEdit}
              deletEvents={deletEvent}
            />
          ) : (
            <FormEventos
              listEvent={listEvents}
              setListEvent={setListEvents}
              alterPage={action}
              preEdit={preEdit}
              modEdit={modEdit}
              setModEdit={setModEdit}
              eventEdit={eventEdit}
            />
          )}
        </Container>
      </>
    );
  }
}

export default CadEventos;
