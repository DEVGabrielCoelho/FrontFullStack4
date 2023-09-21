import { useEffect, useState } from "react";
import { Container, Col, Form, Row, Spinner } from "react-bootstrap";

export default function SelectBox({
  enderecoFonteDados,
  campKey,
  campView,
  functionSelect,
}) {
  const [valorSelecionado, setValueSelect] = useState({
    [campKey]: 0,
    [campView]: "Não foi possível obter os dados do backend",
  });
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      setLoadingData(true);
      fetch(enderecoFonteDados, { method: "GET" })
        .then((resposta) => {
          if (resposta.ok) {
            //código 200
            return resposta.json();
          } else {
            return [
              {
                [campKey]: 0,
                [campView]: "Não foi possível obter os dados do backend",
              },
            ];
          }
        })
        .then((listData) => {
          setLoadingData(false);
          setData(listData);
          if (listData.length > 0) {
            setValueSelect(listData[0]);
            functionSelect(listData[0]);
          }
        });
    } catch (erro) {
      setLoadingData(false);
      setData([
        {
          [campKey]: 0,
          [campView]:
            "Não foi possível obter os dados do backend: " + erro.message,
        },
      ]);
    }
  }, []); //willMount

  return (
    <Container border>
      <Row>
        <Col md={11}>
          <Form.Select
            onChange={(e) => {
              const itemSelecionado = e.currentTarget.value;
              const pos = data
                .map((item) => item[campKey].toString())
                .indexOf(itemSelecionado);
              setValueSelect(data[pos]);
              functionSelect(data[pos]);
            }}
          >
            {data.map((item) => {
              return (
                <option key={item[campKey]} value={item[campKey]}>
                  {item[campView]}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col md={1}>
          <Spinner className={loadingData ? "visible" : "invisible"}></Spinner>
        </Col>
      </Row>
    </Container>
  );
}
