const Endpoint = {
  SEARCH_BY_KEYWORD: (keyword) =>
    `?page=1&pageSize=10$results=100&keyword=${keyword}`,
  FIRST_LOAD: "?page=1&pageSize=10&results=100",
  FILTER_BY_GENDER_MALE: "?page=1&pageSize=10&results=50&gender=male",
  FILTER_BY_GENDER_FEMALE: "?page=1&pageSize=10&results=50&gender=female",
};

const xport = {
  Endpoint,
};
Object.freeze(xport);
module.exports = xport;
