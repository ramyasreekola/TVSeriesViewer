import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SeriesList from "./index";
import { BrowserRouter } from "react-router-dom";

describe("SeriesList", () => {
  const mockData = [
    {
      score: 0.91023177,
      show: {
        id: 139,
        url: "https://www.tvmaze.com/shows/139/girls",
        name: "Girls",
        type: "Scripted",
        language: "English",
        genres: ["Drama", "Romance"],
        status: "Ended",
        runtime: 30,
        averageRuntime: 30,
        premiered: "2012-04-15",
        ended: "2017-04-16",
        officialSite: "http://www.hbo.com/girls",
        schedule: { time: "22:00", days: ["Sunday"] },
        rating: { average: 3 },
        weight: 97,
        network: {
          id: 8,
          name: "HBO",
          country: {
            name: "United States",
            code: "US",
            timezone: "America/New_York",
          },
          officialSite: "https://www.hbo.com/",
        },
        webChannel: null,
        dvdCountry: null,
        externals: { tvrage: 30124, thetvdb: 220411, imdb: "tt1723816" },
        image: {
          medium:
            "https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
          original:
            "https://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg",
        },
        summary:
          "<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>",
        updated: 1704794122,
        _links: {
          self: { href: "https://api.tvmaze.com/shows/139" },
          previousepisode: { href: "https://api.tvmaze.com/episodes/1079686" },
        },
      },
    },
    {
      score: 0.8929176,
      show: {
        id: 41734,
        url: "https://www.tvmaze.com/shows/41734/girls",
        name: "GIRLS",
        type: "Scripted",
        language: "Mongolian",
        genres: ["Comedy"],
        status: "Ended",
        runtime: 41,
        averageRuntime: null,
        premiered: null,
        ended: null,
        officialSite: null,
        schedule: { time: "", days: ["Thursday"] },
        rating: { average: 5 },
        weight: 65,
        network: {
          id: 1672,
          name: "UBS",
          country: {
            name: "Mongolia",
            code: "MN",
            timezone: "Asia/Ulaanbaatar",
          },
          officialSite: null,
        },
        webChannel: null,
        dvdCountry: null,
        externals: { tvrage: null, thetvdb: null, imdb: "tt8709752" },
        image: {
          medium:
            "https://static.tvmaze.com/uploads/images/medium_portrait/191/478539.jpg",
          original:
            "https://static.tvmaze.com/uploads/images/original_untouched/191/478539.jpg",
        },
        summary: null,
        updated: 1632080861,
        _links: { self: { href: "https://api.tvmaze.com/shows/41734" } },
      },
    },
    {
      score: 0.7036585,
      show: {
        id: 525,
        url: "https://www.tvmaze.com/shows/525/gilmore-girls",
        name: "Gilmore Girls",
        type: "Scripted",
        language: "English",
        genres: ["Drama", "Comedy", "Romance"],
        status: "Ended",
        runtime: 60,
        averageRuntime: 60,
        premiered: "2000-10-05",
        ended: "2007-05-15",
        officialSite: null,
        schedule: { time: "21:00", days: ["Tuesday"] },
        rating: { average: 2 },
        weight: 98,
        network: {
          id: 5,
          name: "The CW",
          country: {
            name: "United States",
            code: "US",
            timezone: "America/New_York",
          },
          officialSite: "https://www.cwtv.com/",
        },
        webChannel: null,
        dvdCountry: null,
        externals: { tvrage: 3683, thetvdb: 76568, imdb: "tt0238784" },
        image: {
          medium:
            "https://static.tvmaze.com/uploads/images/medium_portrait/4/11308.jpg",
          original:
            "https://static.tvmaze.com/uploads/images/original_untouched/4/11308.jpg",
        },
        summary:
          "<p><b>Gilmore Girls</b> is a drama centering around the relationship between a thirtysomething single mother and her teen daughter living in Stars Hollow, Connecticut.</p>",
        updated: 1704794301,
        _links: {
          self: { href: "https://api.tvmaze.com/shows/525" },
          previousepisode: { href: "https://api.tvmaze.com/episodes/47639" },
        },
      },
    },
  ];

  const mockOnSearch = jest.fn();
  jest.mock("./SeriesList.module.css", () => ({
    innerContainer: "innerContainer",
    searchBox: "searchBox",
    seriesList: "seriesList",
    seriesItem: "seriesItem",
    seriesName: "seriesName",
  }));

  it("renders the search bar and series list", () => {
    render(
      <BrowserRouter>
        <SeriesList data={mockData} onSearch={mockOnSearch} />
      </BrowserRouter>
    );

    expect(
      screen.getByPlaceholderText("Search for TV shows")
    ).toBeInTheDocument();

    mockData.slice(0, 8).forEach((series) => {
      expect(screen.getByText(series.show.name)).toBeInTheDocument();
    });
  });

  it("navigates to series detail when a series item is clicked", () => {
    const { getByText } = render(
      <BrowserRouter>
        <SeriesList data={mockData} onSearch={mockOnSearch} />
      </BrowserRouter>
    );

    const firstSeriesName = mockData[0].show.name;
    fireEvent.click(getByText(firstSeriesName));
  });

  it("calls onSearch when a search term is submitted", () => {
    render(
      <BrowserRouter>
        <SeriesList data={mockData} onSearch={mockOnSearch} />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search for TV shows");
    const searchButton = screen.getByRole("button", { name: "Search" });

    fireEvent.change(searchInput, { target: { value: "test search" } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith("test search");
  });

  it("renders ratings correctly", () => {
    render(
      <BrowserRouter>
        <SeriesList data={mockData} onSearch={mockOnSearch} />
      </BrowserRouter>
    );

    mockData.slice(0, 8).forEach((series) => {
      const rating = series.show.rating.average;
      const ratingElement = screen.getAllByLabelText(`${rating} Stars`);
      expect(ratingElement[0]).toBeInTheDocument();
    });
  });
});
