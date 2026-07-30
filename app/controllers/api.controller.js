import endpoints from "../../endpoints.json" with { type: "json" };

export default async function getApi(req, res) {
  res.status(200).send(endpoints);
};