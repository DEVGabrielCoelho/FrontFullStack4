import { RiSearchLine } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import { Container, FormControl } from "react-bootstrap";
import React, { useRef, useState } from "react";
import "./styled.css";

export default function SearchBar({
  placeHolder,
  datas,
  campKey,
  campSearch,
  functionSelect,
  value,
}) {
  const inputSearch = useRef();
  const [termSearch, setTermSearch] = useState(value ? value : "");
  const [dataList, setDataList] = useState(datas);
  const [itemSelect, setItemSelect] = useState(false);

  function filterResult() {
    setDataList(
      datas.filter((item) => {
        return campSearch.length > 1
          ? item[campSearch].toLowerCase().includes(termSearch.toLowerCase())
          : false;
      })
    );
    let componenteResultado = document.querySelector("[data-resultado]");
    if (datas.length > 0) {
      componenteResultado.style.display = "block";
    } else {
      componenteResultado.style.display = "none";
    }
  }

  return (
    <>
      <Container>
        <div className="bar">
          <RiSearchLine />
          <FormControl
            type="text"
            ref={inputSearch}
            placeholder={placeHolder}
            value={termSearch}
            required
            onChange={(e) => {
              setTermSearch(e.target.value.toLocaleLowerCase());
              filterResult();
              if (!itemSelect) {
                e.target.setAttribute("aria-invalid", true);
                e.target.setCustomValidity("xxx");
              } else {
                e.target.removeAttribute("aria-invalid");
                e.target.setCustomValidity("");
              }
            }}
          />
          <GrFormClose
            onClick={() => {
              setTermSearch("");
              filterResult();
              setItemSelect(false);
              functionSelect({});
              inputSearch.current.setAttribute("aria-invalid", true);
              inputSearch.current.setCustomValidity("xxx");
            }}
          />
        </div>
        <div className="result">
          <ul data-result>
            {dataList.map((item) => {
              return (
                <li
                  key={item[campKey]}
                  onClick={() => {
                    setTermSearch(item[campSearch]);
                    setItemSelect(true);
                    functionSelect(item);
                    inputSearch.current.setCustomValidity("");
                    document.querySelector("[data-result]").style.display =
                      "none";
                  }}
                >
                  {item[campSearch]}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </>
  );
}
