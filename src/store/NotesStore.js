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
        ...params,
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
        ...params,
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

  await routesPutApi(`/notes/delete/${note.uuid}`);
};

const updateData = async (set, get, note) => {
  const notes = get().notes;

  const editingId = notes.findIndex((el) => el.uuid === note.uuid);
  const newNoteList = notes;
  newNoteList[editingId] = note;
  set({ notes: newNoteList });
  await routesPutApi(`/notes/edit/${note.uuid}`, note);
};

const repositionNote = async (set, get, note, repoNotes) => {
  set({ notes: repoNotes });

  await routesPutApi(`/notes/reposition/${note.uuid}`, {
    refUuid: note.refUuid,
  });
};

const storeObject = (set, get) => ({
  ...noteDetails,
  storeDetails: () => storeData(set),
  addNote: (value) => addData(set, get, value),
  removeNote: (value) => deleteData(set, get, value),
  updateNote: (value) => updateData(set, get, value),
  repositionNote: (value, notes) => repositionNote(set, get, value, notes),
});

export const noteDetailsStore = create(storeObject);
