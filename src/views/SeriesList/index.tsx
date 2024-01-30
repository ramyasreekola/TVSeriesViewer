import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import SearchBar from "../../components/SearchBar";
import { SeriesResponse } from "../../types/series";
import styles from "./SeriesList.module.css";

interface SeriesListProps {
  data: SeriesResponse[];
  onSearch: (searchTerm: string) => void;
}

const SeriesList: React.FC<SeriesListProps> = ({ data, onSearch }) => {
  const navigate = useNavigate();
  const onShowClick = (id: number) => navigate(`/series/${id}`);

  return (
    <div className={styles.innerContainer}>
      <div className={styles.searchBox}>
        <picture>
          <source
            media="(max-width: 486px)"
            srcSet="/src/assets/tvmazemobile.png"
          />
          <img src="/src/assets/tvmaze.png" alt="TVMaze Logo" />
        </picture>
        <SearchBar onSearch={onSearch} />
      </div>

      <div className={styles.seriesList}>
        {data &&
          data.slice(0, 8).map((series) => (
            <div
              onClick={() => onShowClick(series.show.id)}
              key={series.show.id}
              className={styles.seriesItem}
            >
              <img
                src={
                  series.show.image
                    ? series.show.image.medium
                    : "src/assets/placeholder.png"
                }
              />
              <div className={styles.seriesName}>{series.show.name}</div>
              <Rating
                name="series-rating"
                value={series.show.rating.average ?? undefined}
                max={10}
                size="small"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SeriesList;
