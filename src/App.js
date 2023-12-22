import axios from "axios";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import ActorsPage from "./pages/ActorsPage";
import ProducerPage from "./pages/ProducerPage";
import AddMoviePage from "./pages/AddMoviePage";
import MovieEditPage from "./pages/MovieEditPage";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/actors" element={<ActorsPage />}></Route>
          <Route path="/producers" element={<ProducerPage />}></Route>
          <Route path="/add-movie" element={<AddMoviePage />}></Route>
          <Route path="/edit/:id" element={<MovieEditPage />}></Route>
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
