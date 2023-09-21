import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header/index";
import CadEventos from "./Pages/CadEventos";
import { Error } from "./Pages/Error";
import { FiltroEvents } from "./Pages/FiltroEvents";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CadastroProduto" element={<Error />} />
          <Route path="/CadastroPessoas" element={<Error />} />
          <Route path="/Eventos" element={<CadEventos />} />
          <Route path="/FiltroEventos" element={<FiltroEvents />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
