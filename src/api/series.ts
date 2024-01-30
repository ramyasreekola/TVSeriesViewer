import axios from "axios";

const API = "https://api.tvmaze.com";
const getSeries = () => axios.get(`${API}/shows`);
const getShowInfo = (id?: string) => axios.get(`${API}/shows/${id}`);
const getShowCast = (id?: string) =>  axios.get(`${API}/shows/${id}/cast`);
const getSeriesList = (query: string) =>
  axios.get(`${API}/search/shows?q=${query}`);


export { getSeries, getSeriesList, getShowInfo, getShowCast };
