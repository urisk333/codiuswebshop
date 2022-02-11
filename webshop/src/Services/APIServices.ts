import { User, Item } from '../Types/Types';

const BASE_URL = 'http://localhost:3001';

function fetchRequest<T> (path: string, options?: RequestInit): Promise<T> {
  return fetch(`${BASE_URL}${path}`, options)
    .then(res => res.status < 400 ? res : Promise.reject())
    .then(res => res.status !== 204 ? res.json() : res)
    .catch(err => console.log('Error: ', err));
}

function getUsers (): Promise<User[]> {
  return fetchRequest('/users');
}

function getItems (): Promise<Item[]> {
  return fetchRequest('/items');
}

const APIService = {
  getUsers,
  getItems
}

export default APIService;
