import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import { ProductPage } from "./Components/LandingPage/ProductPage/ProductPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      {/* <LandingPage /> */}
    </div>
  );
}

export default App;
