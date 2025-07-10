import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import SingleElement from "./pages/SingleElement";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:category/:id" element={<SingleElement />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
