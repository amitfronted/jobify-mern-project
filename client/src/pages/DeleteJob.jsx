import toast from 'react-hot-toast';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success('This job has been delete now');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return redirect('/dashboard/all-jobs');
};
