import React, { useEffect, useState } from "react";
import SearchBar from "../../Components/SearchBar";
import { dataBase, dataCity } from "../../Data/api.js";
import SelectBox from "../../Components/SelectBox";

export const FiltroEvents = () => {
  const [listEvent, setListEvent] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState({});
  const [selectEvent, setSelectEvent] = useState({});

  useEffect(() => {
    fetch(`${dataBase}city`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setListEvent(data);
        console.log(listEvent);
      });
  }, []);

  return (
    <div>
      <SearchBar
        placeHolder={"Informe o Cidade"}
        data={setListEvent}
        campKey={"cidade"}
        campSearch={"cidade"}
        functionSelect={setSelectEvent}
        value={""}
      />
      <SelectBox
        enderecoFonteDados={dataCity}
        campoChave={"codigo"}
        campoExibicao={"cidade"}
        funcaoSelecao={() => {}}
      />
    </div>
  );
};
