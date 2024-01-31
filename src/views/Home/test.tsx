import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './index'
import { BrowserRouter } from 'react-router-dom'

describe('Home', () => {
  const mockOnSearch = jest.fn()

  jest.mock('./Home.module.css', () => ({
    container: 'container'
  }))

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn()
  }))

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Home onSearch={mockOnSearch} />
      </BrowserRouter>
    )

    expect(screen.getByAltText('TVMaze Logo')).toBeInTheDocument()
  })

  it('contains a SearchBar with the correct placeholder', () => {
    render(
      <BrowserRouter>
        <Home onSearch={mockOnSearch} />
      </BrowserRouter>
    )
    expect(
      screen.getByPlaceholderText('Search for TV shows')
    ).toBeInTheDocument()
  })
})
