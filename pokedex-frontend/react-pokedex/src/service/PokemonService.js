import httpCommon from "../httpCommon";

const getAll = () => {
  return httpCommon.get("/pokemon/getAll");
};

const get = data => {
  return httpCommon.get("/pokemon/getByName", data);
};

const create = data => {
  return httpCommon.post("/pokemon/add", data);
};

const update = data => {
  return httpCommon.put("/pokemon/update", data);
};

const remove = id => {
  return httpCommon.delete(`/pokemon/del/${id}`);
};

const PokemonService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default PokemonService;