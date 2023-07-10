import axios from 'axios';
import queryString from 'query-string';
import { ListenerInterface, ListenerGetQueryInterface } from 'interfaces/listener';
import { GetQueryInterface } from '../../interfaces';

export const getListeners = async (query?: ListenerGetQueryInterface) => {
  const response = await axios.get(`/api/listeners${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createListener = async (listener: ListenerInterface) => {
  const response = await axios.post('/api/listeners', listener);
  return response.data;
};

export const updateListenerById = async (id: string, listener: ListenerInterface) => {
  const response = await axios.put(`/api/listeners/${id}`, listener);
  return response.data;
};

export const getListenerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/listeners/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteListenerById = async (id: string) => {
  const response = await axios.delete(`/api/listeners/${id}`);
  return response.data;
};
