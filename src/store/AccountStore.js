import { create } from 'zustand';
import { routesGetApi } from '../api';

//API Function

const accountDetails = {
  userInfomation: [],
};

//set Details object properties
const storeAcc = async (set) => {
  await routesGetApi('/users').then(({ data }) => {
    // console.log('data');
    const capitalizeFirstName = data.name.charAt(0).toUpperCase();
    const newFirstName = capitalizeFirstName + data.name.slice(1) + `'s`;
    // console.log('newFirstName', newFirstName);
    return set({
      userInfomation: { ...data, newFirstName },
    });
  });
};

const accountLoginStoreObject = (set, get) => ({
  ...accountDetails,
  storeAccDetails: () => storeAcc(set),
});

export const accountLoginDetailsStore = create(accountLoginStoreObject);
