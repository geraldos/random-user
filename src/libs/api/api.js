import { instance } from "../axios";
import { Endpoint } from "../endpoint";
const getDefinition = () => import("../definition");

class ApiService {
  static Instance = null;
  constructor() {
    this.data = instance;
  }

  static async getInstance(context) {
    if (this.Instance == null) {
      const { vuePrototype } = await getDefinition();
      let data = vuePrototype(context.$data);
      this.Instance = new ApiService({ data: data });
    }
    return this.Instance;
  }

  async getDataSearchByKeyword(keyword) {
    const result = await this.data.get(Endpoint.SEARCH_BY_KEYWORD(keyword));

    try {
      if (result.status == 200) {
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }

  async getFirstLoad() {
    const result = await this.data.get(Endpoint.FIRST_LOAD);

    try {
      if (result.status == 200) {
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }

  async getDataByGenderMale() {
    const result = await this.data.get(Endpoint.FILTER_BY_GENDER_MALE);

    try {
      if (result.status == 200) {
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }

  async getDataByGenderFemale() {
    const result = await this.data.get(Endpoint.FILTER_BY_GENDER_FEMALE);

    try {
      if (result.status == 200) {
        return result.data;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default ApiService;
