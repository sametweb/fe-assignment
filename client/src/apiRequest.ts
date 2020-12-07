// Global imports
import Axios from "axios";

// Type imports
import { AxiosResponse } from "axios";

const apiRequest = (url: string): Promise<AxiosResponse> => {
  return Axios.get(url);
};

export default apiRequest;
