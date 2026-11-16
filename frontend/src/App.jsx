import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import PhotoPage from "./pages/PhotoPage.jsx";
import PhotoDescriptionPage from "./pages/PhotoDescriptionPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PhotoPage />} />
        <Route path="/poze/:id" element={<PhotoDescriptionPage />} />
        <Route path="/despre" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}