import { create } from 'zustand';
import { routesGetApi, routesPutApi } from '../api';

//API Function

const accountDetails = {
  userInfomation: {
    name: '',
    newFirstName: '',
    nameInitital: '',
  },
};

//set Details object properties
const storeAcc = async (set) => {
  await routesGetApi('/users').then(({ data }) => {
    // console.log('data');
    const capitalizeFirstName = data.name.charAt(0).toUpperCase();
    const newFirstName = capitalizeFirstName + data.name.slice(1) + `'s`;
    const nameInitital = data.name[0];
    // console.log('newFirstName', data);
    return set({
      userInfomation: { ...data, newFirstName, nameInitital },
    });
  });
};

const updateData = async (set, get, user) => {
  await routesPutApi('/users/edit', user);

  console.log('user', user);
  set({ userInfomation: { ...user } });
};

const accountLoginStoreObject = (set, get) => ({
  ...accountDetails,
  storeAccDetails: () => storeAcc(set),
  updateUser: (value) => updateData(set, get, value),
});

export const accountLoginDetailsStore = create(accountLoginStoreObject);
