import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Table,
} from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri";
import { HiPencilAlt, HiPlus, HiTrash } from "react-icons/hi";
import "./style.css";
import { dataBase } from "../../Data/api";
import { useEffect } from "react";

export const TableEvent = (props) => {
  // const filterEvents = (e) => {
  //   const termSearch = e.currentTarget.value;
  //   fetch(dataBase + "events", {
  //     method: "GET",
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (Array.isArray(data)) {
  //         const listEvent = data.filter((event) =>
  //           event.title.toLowerCase().includes(termSearch.toLowerCase())
  //         );
  //         props.setListEvent(listEvent);
  //       } else {
  //         setErro(data);
  //       }
  //     });
  // };

  useEffect(() => {
    fetch(dataBase + "events", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const listEvent = data.filter((event) =>
            event.title.toLowerCase().includes(termSearch.toLowerCase())
          );
          setListEvent(listEvent);
        } else {
          setErro(data);
        }
      });
  }, []);

  // const [listEvent, setListEvent] = useState([]);
  const [citySelect, setCitySelect] = useState({
    codigo: 0,
    cidade: "",
  });

  const [listEvent, setListEvent] = useState({
    title: "",
    setTime: "",
    startDate: "",
    endDate: "",
    city_code: {
      city: setCitySelect.cidade,
    },
    description: "",
  });

  return (
    <>
      <Container>
        <h2>Cadastro de Eventos</h2>
        <div className="areaNewFilter">
          <InputGroup>
            <FormControl
              type="text"
              id="termSearch"
              placeholder="Buscar"
              onChange={filterEvents}
            />
            <InputGroup.Text>
              <RiSearchLine />
            </InputGroup.Text>
          </InputGroup>
          <Button onClick={props.alterPage} variant="primary">
            <HiPlus />
          </Button>
        </div>

        <Table striped bordered hover size="sm" className="mt-5">
          <thead>
            <tr className="text-center">
              <th>Título</th>
              <th>Hora</th>
              <th>Data Inicial</th>
              <th>Data Final</th>
              <th>Cidade</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listEvent?.map((e) => {
              return (
                <tr className="text-center" key={e.title}>
                  <td>{e.title}</td>
                  <td>{e.setTime}</td>
                  <td>{e.startDate}</td>
                  <td>{e.endDate}</td>
                  <td>{citySelect.cidade}</td>
                  <td>{e.description}</td>
                  <td>
                    <div className="areaButtons">
                      <Button
                        onClick={() => {
                          if (confirm("Confirma a edição do Evento?")) {
                            props.preEdit(e);
                          }
                        }}
                      >
                        <HiPencilAlt />
                      </Button>
                      <Button
                        onClick={() => {
                          if (confirm("Confirma a exclusão do Evento ?"))
                            props.deletEvents(e);
                        }}
                      >
                        <HiTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
