import React, { useEffect, useState } from "react";
import SearchBar from "../../Components/SearchBar";
import { dataBase, dataCity } from "../../Data/api.js";
import SelectBox from "../../Components/SelectBox";
import Header from "../../Components/Header";

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
    <>
      <Header />
      <SearchBar
        placeHolder={"Informe o Cidade"}
        datas={listEvent} // Use datas em vez de data
        campKey={"codigo"}
        campSearch={"cidade"}
        functionSelect={setSelectEvent}
        value={""}
      />

      <SelectBox
        apiData={listEvent}
        campKey={"codigo"}
        campView={"cidade"}
        functionSelect={setCategoriaSelecionada}
      />
    </>
  );
};
