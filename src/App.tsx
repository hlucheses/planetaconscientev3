import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { TeamPage } from "./pages/TeamPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProvincePage } from "./pages/ProvincePage";
import { VolunteerPage } from "./pages/VolunteerPage";
import { DonatePage } from "./pages/DonatePage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/equipa" element={<TeamPage />} />
          <Route path="/projectos" element={<ProjectsPage />} />
          <Route path="/projectos/:slug" element={<ProjectDetailPage />} />
          <Route path="/provincias/:slug" element={<ProvincePage />} />
          <Route path="/voluntariado" element={<VolunteerPage />} />
          <Route path="/donativos" element={<DonatePage />} />
          <Route path="/contactos" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
