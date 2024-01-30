import { getSeriesList,getShowInfo, getShowCast } from "./series";
import { SeriesResponse, Show, CastMember } from "../types/series";

const fetchSeriesList = async (
  setData: (data: SeriesResponse[]) => void,
  setError: (error: string) => void,
  query: string,
) => {
  if (!query) return;

  try {
    const response = await getSeriesList(query);
    setData(response.data);
  } catch (error) {
    console.error(`Server returned an error: ${error}`);
    setError('Failed to fetch series list for given url.');
  }
};

const fetchShow = async (setData: (data: Show) => void, setError: (error: string) => void, id?: string) => {
  if (!id) return;

  try {
    const response = await getShowInfo(id);
    setData(response.data);
  } catch (error) {
    console.error(`Server returned an error: ${error}`);
    setError('Failed to fetch data for given url.')
  }
};

const fetchShowCast = async (setData: (data: CastMember[]) => void, setError: (error: string) => void, id?: string) => {
  if (!id) return;

  try {
    const response = await getShowCast(id);
    setData(response.data);
  } catch (error) {
    console.error(`Server returned an error: ${error}`);
    setError('Failed to fetch data for given url.')
  }
};
export { fetchSeriesList, fetchShow, fetchShowCast };
