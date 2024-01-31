import axios, { type AxiosResponse } from 'axios'
import { type SeriesResponse, type Show, type CastMember } from '../types/series'

const API = 'https://api.tvmaze.com'
const getSeries = async (): Promise<AxiosResponse<SeriesResponse[]>> => await axios.get(`${API}/shows`)
const getShowInfo = async (id?: string): Promise<AxiosResponse<Show>> => await axios.get(`${API}/shows/${id}`)
const getShowCast = async (id?: string): Promise<AxiosResponse<CastMember[]>> => await axios.get(`${API}/shows/${id}/cast`)
const getSeriesList = async (query: string): Promise<AxiosResponse<SeriesResponse[]>> =>
  await axios.get(`${API}/search/shows?q=${query}`)

export { getSeries, getSeriesList, getShowInfo, getShowCast }
