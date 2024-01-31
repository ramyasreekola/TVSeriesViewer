import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SeriesList from './index'
import { BrowserRouter } from 'react-router-dom'
import { SeriesResponse } from '../../types/series'

describe('SeriesList', () => {
  const mockData = [
    {
      score: 0.91023177,
      show: {
        id: 139,
        url: 'https://www.tvmaze.com/shows/139/girls',
        name: 'Girls',
        type: 'Scripted',
        genres: ['Drama', 'Romance'],
        rating: { average: 3 },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg'
        },
        summary:
          '<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>',
      }
    },
    {
      score: 0.8929176,
      show: {
        id: 41734,
        url: 'https://www.tvmaze.com/shows/41734/girls',
        name: 'GIRLS',
        type: 'Scripted',
        genres: ['Comedy'],
        rating: { average: 5 },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/191/478539.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/191/478539.jpg'
        },
        summary: null,
      }
    },
  ] as SeriesResponse[]

  const mockOnSearch = jest.fn()
  jest.mock('./SeriesList.module.css', () => ({
    innerContainer: 'innerContainer',
    searchBox: 'searchBox',
    seriesList: 'seriesList',
    seriesItem: 'seriesItem',
    seriesName: 'seriesName'
  }))

  it('renders the search bar and series list', () => {
    render(
      <BrowserRouter>
        <SeriesList data={mockData} onSearch={mockOnSearch} />
      </BrowserRouter>
    )

    expect(
      screen.getByPlaceholderText('Search for TV shows')
    ).toBeInTheDocument()

    mockData.slice(0, 8).forEach((series) => {
      expect(screen.getByText(series.show.name)).toBeInTheDocument()
    })
  })

  it('navigates to series detail when a series item is clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <SeriesList data={mockData} onSearch={mockOnSearch} />
      </BrowserRouter>
    )

    const firstSeriesName = mockData[0].show.name
    fireEvent.click(getByText(firstSeriesName))
  })

  it('calls onSearch when a search term is submitted', () => {
    render(
      <BrowserRouter>
        <SeriesList data={mockData} onSearch={mockOnSearch} />
      </BrowserRouter>
    )

    const searchInput = screen.getByPlaceholderText('Search for TV shows')
    const searchButton = screen.getByRole('button', { name: 'Search' })

    fireEvent.change(searchInput, { target: { value: 'test search' } })
    fireEvent.click(searchButton)

    expect(mockOnSearch).toHaveBeenCalledWith('test search')
  })

  it('renders ratings correctly', () => {
    render(
      <BrowserRouter>
        <SeriesList data={mockData} onSearch={mockOnSearch} />
      </BrowserRouter>
    )

    mockData.slice(0, 8).forEach((series) => {
      const rating = series.show.rating.average
      const ratingElement = screen.getAllByLabelText(`${rating} Stars`)
      expect(ratingElement[0]).toBeInTheDocument()
    })
  })
})
