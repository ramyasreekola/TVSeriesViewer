import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Rating from '@mui/material/Rating'
import DOMPurify from 'dompurify'
import SearchBar from '../../components/SearchBar'
import { type Show as ShowType, type CastMember } from '../../types/series'
import { fetchShow, fetchShowCast } from '../../api/utils'
import styles from './Show.module.css'
import { Error } from '../404'

interface ShowProps {
  onSearch: (searchTerm: string) => void
}

const createMarkup = (htmlContent: string): { __html: string } => {
  return { __html: DOMPurify.sanitize(htmlContent) }
}

const ShowComponent: React.FC<ShowProps> = ({ onSearch }) => {
  const { id } = useParams()
  const [show, setShow] = useState<ShowType>()
  const [cast, setCast] = useState<CastMember[]>()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    void fetchShow(setShow, setError, id)
    void fetchShowCast(setCast, setError, id)
  }, [id])

  if (error != null) {
    return <Error message={error} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        {' '}
        <picture>
          <source
            media="(max-width: 486px)"
            srcSet="/src/assets/tvmazemobile.png"
          />
          <img src="/src/assets/tvmaze.png" alt="TVMaze Logo" />
        </picture>
        <SearchBar onSearch={onSearch} />
      </div>
      <div className={styles.backButton} onClick={() => { navigate(-1) }}>
        <ArrowBackIcon fontSize="small" />
        Back to Search Results
      </div>
      {show && (
        <div className={styles.showDetails}>
          <img
            className={styles.showImage}
            src={show.image?.medium ?? '/src/assets/placeholder.png'}
            alt={show.name}
          />
          <div className={styles.showContainer}>
            <div className={styles.showContent}>
              <h1 className={styles.showTitle}>{show.name}</h1>
              <Rating
                name="read-only"
                value={show.rating.average}
                readOnly
                max={10}
              />
              <p className={styles.showGenres}>
                <b>Genres:</b> {show.genres.join(' | ')}
              </p>
              <p
                className={styles.showSummary}
                dangerouslySetInnerHTML={createMarkup(show.summary)}
              />
            </div>
            {cast && (
              <>
                <h1 className={styles.castTitle}>Cast</h1>
                <div className={styles.showCast}>
                  {cast.map((castMember) => (
                    <div key={castMember.person.id}>
                      <img
                        src={castMember.person.image.medium}
                        className={styles.castImage}
                      />
                      <div className={styles.castName}>
                        {castMember.person.name}
                      </div>
                      <div className={styles.castCharacter}>
                        as: {castMember.character.name}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowComponent
