import * as SaleLogic from "@/logics/sale.logic";
import { send } from "@/utils/errors";

export const searchSales = (request, response) => {
  send(response, async () => {
    const query = request.query;
    return await SaleLogic.searchSales(query);
  });
};

export const searchSalesByWriterId = (request, response) => {
  send(response, async () => {
    const id = request.params.id;
    const sale = await SaleLogic.searchSalesByWriterId(id);


    return sale;
  });
};

export const getSaleById = (request, response) => {
  send(response, async () => {
    const id = request.params.id;
    return await SaleLogic.getSaleById(id);
  });
};

export const createSale = (request, response) => {
  send(response, async () => {
    const sale = request.body;
    return await SaleLogic.createSale(sale);
  });
};

export const updateSale = (request, response) => {
  send(response, async () => {
    const sale = request.body;
    const id = request.params.id;
    return await SaleLogic.updateSale(id, sale);
  });
};

export const deleteSale = (request, response) => {
  send(response, async () => {
    const id = request.params.id;
    return await SaleLogic.deleteSale(id);
  });
};
