import { Route, Routes } from "react-router-dom";
import Form from "./Form";

const App = () => {
  return (
    <section>
      <Routes>
        <Route path="/view-form/:tagName" element={<Form />} />
      </Routes>
    </section>
  );
};

export default App;
