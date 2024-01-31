import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ShowComponent from './index'
import { BrowserRouter } from 'react-router-dom'

describe('ShowComponent', () => {
  const mockOnSearch = jest.fn()

  jest.mock('./Show.module.css', () => ({
    container: 'container',
    searchBox: 'searchBox',
    backButton: 'backButton',
    showDetails: 'showDetails',
    showImage: 'showImage',
    showContent: 'showContent',
    showTitle: 'showTitle',
    showGenres: 'showGenres',
    showSummary: 'showSummary'
  }))

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      id: '1'
    }),
    useNavigate: () => jest.fn()
  }))

  jest.mock('../../api/utils.ts', () => ({
    fetchShow: jest.fn().mockResolvedValue({
      id: 1,
      url: 'https://www.tvmaze.com/shows/1/under-the-dome',
      name: 'Under the Dome',
      type: 'Scripted',
      language: 'English',
      genres: ['Drama', 'Science-Fiction', 'Thriller'],
      status: 'Ended',
      runtime: 60,
      averageRuntime: 60,
      premiered: '2013-06-24',
      ended: '2015-09-10',
      officialSite: 'http://www.cbs.com/shows/under-the-dome/',
      schedule: { time: '22:00', days: ['Thursday'] },
      rating: { average: 6.5 },
      weight: 98,
      network: {
        id: 2,
        name: 'CBS',
        country: {
          name: 'United States',
          code: 'US',
          timezone: 'America/New_York'
        },
        officialSite: 'https://www.cbs.com/'
      },
      webChannel: null,
      dvdCountry: null,
      externals: { tvrage: 25988, thetvdb: 264492, imdb: 'tt1553656' },
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
        original:
          'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg'
      },
      summary:
        "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
      updated: 1704794065,
      _links: {
        self: { href: 'https://api.tvmaze.com/shows/1' },
        previousepisode: { href: 'https://api.tvmaze.com/episodes/185054' }
      }
    })
  }))

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ShowComponent onSearch={mockOnSearch} />
      </BrowserRouter>
    )

    expect(
      screen.getByPlaceholderText('Search for TV shows')
    ).toBeInTheDocument()
  })

  it('calls onSearch when a search term is submitted', () => {
    render(
      <BrowserRouter>
        <ShowComponent onSearch={mockOnSearch} />
      </BrowserRouter>
    )

    const searchInput = screen.getByPlaceholderText('Search for TV shows')
    const searchButton = screen.getByRole('button', { name: 'Search' })

    fireEvent.change(searchInput, { target: { value: 'test search' } })
    fireEvent.click(searchButton)

    expect(mockOnSearch).toHaveBeenCalledWith('test search')
  })
})
