import Form from "./Form";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <section>
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
    </section>
  );
};

export default App;
