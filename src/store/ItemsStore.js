import { create } from 'zustand';
import {
  routesDeleteApi,
  routesGetApi,
  routesPostApi,
  routesPutApi,
} from '../api';

//API Function

const itemDetails = {
  note: {},
  items: [],
};

//set Details object properties
const storeItems = async (set, id) => {
  await routesGetApi(`/items/getbynote/${id}`).then(({ data }) => {
    return set({
      items: data,
    });
  });
};

const storeNote = async (set, id) => {
  await routesGetApi(`/notes/${id}`).then(({ data }) => {
    return set({
      note: data,
    });
  });
};

// TODO edit this to not wait for response
const addData = async (set, get, params) => {
  const items = get().items;

  switch (params.loc) {
    case 'last':
      const uuidParams = items.length ? items.slice(-1) : '';

      const newNote = await routesPostApi('/items', {
        ...params,
        refUuid: items.length ? uuidParams[0].uuid : uuidParams,
      });

      if (newNote) {
        console.log('newNote', newNote);
        let newNoteData = newNote.data.item;
        let noteList = [...items, newNoteData];
        return set({ items: noteList });
      }
      return true;
    case 'middle':
      const newItemList = items;
      const itemEditingId = items.findIndex(
        (item) => item.uuid === params.isItemEditing.uuid
      );

      const newMiddleNote = await routesPostApi('/items', ...params);

      if (newMiddleNote) {
        newItemList[itemEditingId] = newMiddleNote.data.note;
        return set({ items: newItemList });
      }
      break;
  }
};

const deleteData = async (set, get, item) => {
  const items = get().items;

  const newItemList = items;
  const itemDeletedId = items.findIndex((data) => data.uuid === item.uuid);
  newItemList.splice(itemDeletedId, 1);
  set({ items: newItemList });

  await routesPutApi(`/items/delete/${item.uuid}`);
};

const updateData = async (set, get, note) => {
  const items = get().items;

  const editingId = items.findIndex((el) => el.uuid === note.uuid);
  const newNoteList = items;
  newNoteList[editingId] = note;
  set({ items: newNoteList });
  await routesPutApi(`/items/edit/${note.uuid}`, note);
};

const repositionData = async (set, get, note, repoNotes) => {
  set({ items: repoNotes });

  await routesPutApi(`/items/reposition/${note.uuid}`, {
    refUuid: note.refUuid,
  });
};

const updateCheckedData = async (set, get, item) => {
  const items = get().items;

  const newItemList = items;
  const itemEditingId = items.findIndex((el) => el.uuid === item.uuid);
  newItemList[itemEditingId] = item;
  await routesPutApi(`/items/editcheck/${item.uuid}`);
  set({ items: newItemList });
};

const storeObject = (set, get) => ({
  ...itemDetails,
  storeNote: (value) => storeNote(set, value),
  storeItems: (value) => storeItems(set, value),
  addItem: (value) => addData(set, get, value),
  removeItem: (value) => deleteData(set, get, value),
  updateItem: (value) => updateData(set, get, value),
  repositionItem: (value, items) => repositionData(set, get, value, items),
  updateCheckedItem: (value) => updateCheckedData(set, get, value),
});

export const itemDetailsStore = create(storeObject);
