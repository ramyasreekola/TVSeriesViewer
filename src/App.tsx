import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import { NotFound, Error } from "./views/404";
import SeriesList from "./views/SeriesList";
import ShowComponent from "./views/Show";
import { fetchSeriesList } from "./api/utils";
import { SeriesResponse } from "./types/series";
import styles from "./styles/global.module.css";

const App: React.FC = () => {
  const [seriesList, setSeriesList] = useState<SeriesResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (searchTerm: string) => {
    fetchSeriesList(setSeriesList, setError, searchTerm);
  };

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home onSearch={handleSearch} />} />
          <Route path="series">
            <Route
              index
              element={<SeriesList data={seriesList} onSearch={handleSearch} />}
            />
            <Route
              path=":id"
              element={<ShowComponent onSearch={handleSearch} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
