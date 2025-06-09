import toast from 'react-hot-toast';
import { JobContainer, SearchContainer } from '../Components';
import customFetch from '../utils/customFetch';
import { createContext, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get('/jobs', {
      params,
    });
    return {
      data,
      searchValues: { ...params },
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const allJobsContext = createContext();

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();
  return (
    <allJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobContainer />
    </allJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(allJobsContext);

export default AllJobs;
