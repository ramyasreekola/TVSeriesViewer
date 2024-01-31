import React from 'react'
import { useNavigate } from 'react-router-dom'
import Rating from '@mui/material/Rating'
import SearchBar from '../../components/SearchBar'
import { type SeriesResponse } from '../../types/series'
import styles from './SeriesList.module.css'

interface SeriesListProps {
  data: SeriesResponse[]
  onSearch: (searchTerm: string) => void
}

const SeriesList: React.FC<SeriesListProps> = ({ data, onSearch }) => {
  const navigate = useNavigate()
  const onShowClick = (id: number): void => {
    navigate(`/series/${id}`)
  }

  if (data.length === 0) {
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
        <h2 className={styles.noResults}>
          No results found. Try another search.
        </h2>
      </div>
    );
  }

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
        {data.slice(0, 8).map((series) => (
          <div
            onClick={() => { onShowClick(series.show.id) }}
            key={series.show.id}
            className={styles.seriesItem}
          >
            <img
              src={
                series.show.image?.medium ??
                'src/assets/placeholder.png'
              }
              alt={series.show.name}
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
  )
}

export default SeriesList
