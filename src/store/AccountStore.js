import { create } from 'zustand';
import { routesGetApi, routesPostApi, routesPutApi } from '../api';

const accountDetails = {
  userInfomation: {
    name: '',
    newFirstName: '',
    nameInitital: '',
    email: '',
    image: '',
  },
};

const otherNamespaces = (name) => {
  const capitalizeFirstName = name.charAt(0).toUpperCase();
  const newFirstName = capitalizeFirstName + name.slice(1) + `'s`;
  const nameInitital = name[0];
  return {
    newFirstName,
    nameInitital,
  };
};

const storeAcc = async (set) => {
  await routesGetApi('/users').then(({ data, status }) => {
    if (status === 200) {
      const { newFirstName, nameInitital } = otherNamespaces(data.name);
      console.log('storing...');
      return set({
        userInfomation: { ...data, newFirstName, nameInitital },
      });
    }
  });
};

const updateData = async (set, get, user) => {
  let userInfo = get().userInfomation;

  const { newFirstName, nameInitital } = otherNamespaces(
    user.name ?? userInfo.name
  );

  await routesPutApi('/users/edit', user);
  set({ userInfomation: { ...userInfo, ...user, newFirstName, nameInitital } });
};

const logout = async (set) => {
  set({ userInfomation: {} });
};

const accountLoginStoreObject = (set, get) => ({
  ...accountDetails,
  storeAccDetails: () => storeAcc(set),
  updateUser: (value) => updateData(set, get, value),
  logoutUser: () => logout(set),
});

export const accountLoginDetailsStore = create(accountLoginStoreObject);
