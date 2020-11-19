import * as PointOfSaleLogic from "@/logics/pointOfSale.logic";
import { send } from "@/utils/errors";

export const searchPoS = (request, response) => {
  send(response, async () => {
    const query = request.query;
    return await PointOfSaleLogic.searchPoS(query);
  });
};

export const getPoSById = (request, response) => {
  send(response, async () => {
    const id = request.params.id;
    return await PointOfSaleLogic.getPoSById(id);
  });
};

export const createPoS = (request, response) => {
  send(response, async () => {
    const poS = request.body;
    return await PointOfSaleLogic.createPoS(poS);
  });
};

export const updatePoS = (request, response) => {
  send(response, async () => {
    const poS = request.body;
    const id = request.params.id;
    return await PointOfSaleLogic.updatePoS(id, poS);
  });
};

export const deletePoS = (request, response) => {
  send(response, async () => {
    const id = request.params.id;
    return await PointOfSaleLogic.deletePoS(id);
  });
};
