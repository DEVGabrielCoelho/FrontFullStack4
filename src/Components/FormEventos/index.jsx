import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { IMaskInput } from "react-imask";
import { dataBase, dataBaseCity } from "../../Data/api";
import SelectBox from "../SelectBox";

export const FormEventos = (props) => {
  const [validated, setValidated] = useState(false);
  const [events, setEvents] = useState(props.eventEdit);

  const manipInput = (e) => {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const value = elemForm.value;
    setEvents({ ...events, [id]: value });
  };

  function handleSubmit(e) {
    const formElem = e.currentTarget;
    if (formElem.checkValidity()) {
      if (!props.modEdit) {
        fetch(dataBase + "events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(events),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.status) {
              props.setModEdit(false);
              let newListEvents = props.listEvent;
              newListEvents.push(events);
              props.setListEvent(newListEvents);
              props.alterPage(true);
            }
            window.alert(data.message);
          })
          .catch((erro) => {
            window.alert(`Erro ao executar a requisição ${erro.message}`);
          });
      } else {
        fetch(dataBase + "events", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(events),
        })
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((data) => {
            if (data.status) {
              console.log(data.status);
              window.alert("Evento atualizado com Sucesso!");
              window.location.reload();
            }
            window.alert(data.message);
          })
          .catch((erro) => {
            window.alert(`Erro ao executar a requisição ${erro.message}`);
          });
      }
      setValidated(false);
    } else {
      setValidated(true);
    }
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <h1>Cadastro de Eventos</h1>
      <Form
        className="FormEvent"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col className="mb-3">
            <Form.Group as={Col} md="10">
              <Form.Label>Evento</Form.Label>
              <Form.Control
                required
                type="text"
                value={events.title}
                id="title"
                onChange={manipInput}
                placeholder="Titulo do Evento"
              />
              <Form.Control.Feedback type="invalid">
                Insira o titulo do Evento.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="text"
                as={IMaskInput}
                mask="00:00"
                value={events.setTime}
                id="setTime"
                onChange={manipInput}
                placeholder="Exemplo: 19:30h"
                required
              />
              <Form.Control.Feedback type="invalid">
                Insira o horário inicial do evento.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Data Inicio</Form.Label>
              <Form.Control
                type="date"
                id="startDate"
                onChange={manipInput}
                value={events.startDate}
                required
              />
              <Form.Control.Feedback type="invalid">
                Insira Data Inicial do Evento
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Data Final</Form.Label>
              <Form.Control
                type="date"
                id="endDate"
                onChange={manipInput}
                value={events.endDate}
                required
              />
              <Form.Control.Feedback type="invalid">
                Insira Data Inicial do Evento
              </Form.Control.Feedback>
            </Form.Group>
            <br />
          </Col>
          <Col className="md-3">
            <SelectBox
              enderecoFonteDados={dataBaseCity}
              campoChave={"codigo"}
              campoExibicao={"cidade"}
              funcaoSelecao={events.city_code}
            />
            <Form.Group as={Col} md="10">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                id="description"
                aria-label="With textarea"
                placeholder="Descrição do Evento"
                value={events.description}
                onChange={manipInput}
                rows={4}
                cols={100}
                required
              />
              <Form.Control.Feedback type="invalid">
                Insira a descrição do Evento
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <hr />

        <Button type="submit" variant="primary">
          Cadastrar
        </Button>
        <Button
          style={{ marginLeft: "20px" }}
          type="button"
          variant="secondary"
          onClick={props.alterPage}
        >
          Voltar
        </Button>
      </Form>
    </>
  );
};
