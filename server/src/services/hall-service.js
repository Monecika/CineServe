import {Hall} from '../models/index.js';

export const getHalls = async () => {
  return await Hall.findAll({attributes: ['id', 'name']});
};