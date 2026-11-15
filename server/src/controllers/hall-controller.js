import * as hallService from '../services/hall-service.js';

export const getHalls = async (req, res) => {
  res.json(await hallService.getHalls());
};