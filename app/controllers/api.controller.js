import endpoints from "../../endpoints.json";

export default async function getApi(request, response) {
  response.status(200).send(endpoints);
};