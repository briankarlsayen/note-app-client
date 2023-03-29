import { create } from 'zustand';
import {
  routesDeleteApi,
  routesGetApi,
  routesPostApi,
  routesPutApi,
} from '../api';

//API Function

const noteDetails = {
  notes: [],
};

//set Details object properties
const storeData = async (set) => {
  await routesGetApi('/notes').then(({ data }) => {
    return set({
      notes: data,
    });
  });
};

const addData = async (set, get, params) => {
  const notes = get().notes;

  switch (params.loc) {
    case 'last':
      const uuidParams = notes.length ? notes.slice(-1) : '';

      const newNote = await routesPostApi('/notes', {
        title: params.title,
        body: '',
        description: '',
        refUuid: notes.length ? uuidParams[0].uuid : uuidParams,
      });

      if (newNote) {
        let newNoteData = newNote.data.note;
        let noteList = [...notes, newNoteData];
        return set({ notes: noteList });
      }
      break;
    case 'middle':
      const newNoteList = notes;
      const noteEditingId = notes.findIndex(
        (note) => note.uuid === params.isNoteEditing.uuid
      );

      const newMiddleNote = await routesPostApi('/notes', {
        title: params.title,
        body: '',
        description: '',
        refUuid: params.refUuid,
      });

      if (newMiddleNote) {
        newNoteList[noteEditingId] = newMiddleNote.data.note;
        return set({ notes: newNoteList });
      }
      break;
  }

  // const newNoteParams = {
  //   title: value,
  //   body: '',
  //   description: '',
  //   refUuid: notes.length ? uuidParams[0].uuid : uuidParams,
  // };
  // let newNoteData = newNoteParams;
  // let noteList = [...notes, newNoteData];
};

const deleteData = async (set, get, note) => {
  const notes = get().notes;

  const newNoteList = notes;
  const noteDeletedId = notes.findIndex((data) => data.uuid === note.uuid);
  newNoteList.splice(noteDeletedId, 1);
  set({ notes: newNoteList });

  routesPutApi(`/notes/delete/${note.uuid}`);

  // if (!deleteNoteData) return console.log('error', error);
};

const storeObject = (set, get) => ({
  ...noteDetails,
  storeDetails: () => storeData(set),
  addNote: (value) => addData(set, get, value),
  removeNote: (value) => deleteData(set, get, value),
});

export const noteDetailsStore = create(storeObject);
