import axios from "axios";
import { domain } from "../constants/setting_api";

export class SearchService{
      search = (searchInput) => {
        return axios({
          url: `${domain}/search/search`,
          method: "POST",
          data: searchInput,
        });
      };
      getInitData = () => {
        return axios({
          url: `${domain}/search/getAll`,
          method: "GET"
        });
      };
}

export const searchService = new SearchService();