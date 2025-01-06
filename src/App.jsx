import { HashRouter, Route, Routes } from "react-router-dom";
import Form from "./Form";

const App = () => {
  return (
    <HashRouter>
      <section>
        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
      </section>
    </HashRouter>
  );
};

export default App;
