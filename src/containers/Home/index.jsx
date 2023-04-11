import React, { useState, useRef, useEffect } from 'react';
import Note from '../Note';
import addIcon from '../../assets/icons/add.svg';
import noteOptionIcon from '../../assets/icons/note-options.svg';
import Skeleton from '../../components/Skeleton';
import Options from '../../components/List/Options';
import InputBar from '../../components/List/InputBar';
import useWindowDimensions from '../../components/useWindowDimensions';
import { accountLoginDetailsStore } from '../../store/AccountStore';
import { shallow } from 'zustand/shallow';
import { noteDetailsStore } from '../../store/NotesStore';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [hoveredItem, setHoveredItem] = useState();
  const [noteOption, setNoteOption] = useState('');
  const [isNoteEditing, setNoteEditing] = useState('');
  const [noteTextInput, setNoteTextInput] = useState('');
  const [isRefUuid, setRefUuid] = useState('');
  const refNoteInput = useRef(null);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [isDragActive, setDragActive] = useState();
  const { width } = useWindowDimensions();

  const { userInfomation } = accountLoginDetailsStore(
    (state) => state,
    shallow
  );
  const {
    notes,
    storeDetails,
    addNote,
    removeNote,
    updateNote,
    repositionNote,
  } = noteDetailsStore((state) => state, shallow);

  useEffect(() => {
    storeDetails();
  }, []);

  const createNote = async (e) => {
    e.preventDefault();
    try {
      if (!inputText) return null;
      const params = {
        title: inputText,
        loc: 'last',
        body: '',
        description: '',
      };
      addNote(params);
      setInputText('');
    } catch (error) {
      console.log('error', error);
    }
  };
  const itemHovered = (item) => {
    if (!noteOption) return setHoveredItem(item.uuid);
  };
  const itemNotHovered = () => {
    if (!noteOption) setHoveredItem('');
  };

  const itemClicked = (note) => {
    if (note.uuid === noteOption) {
      setNoteOption('');
    } else {
      setNoteOption(note.uuid);
      setHoveredItem(note.uuid);
    }
  };
  const deleteNote = async (note) => {
    try {
      setNoteOption('');
      removeNote(note);
    } catch (error) {
      console.log('error', error);
    }
  };
  const editNote = async (note) => {
    setNoteEditing(note);
  };

  const saveEditNote = async (e) => {
    if (e.type === 'submit') e.preventDefault();
    if (isNoteEditing && checkInputEmpty()) {
      setNoteOption('');
      if (isRefUuid) {
        try {
          const editData = {
            title: noteTextInput,
            refUuid: isRefUuid,
            body: '',
            description: '',
            type: 'Text',
            checked: false,
            isNoteEditing,
            loc: 'middle',
          };

          addNote(editData);

          setRefUuid('');
          setNoteEditing(null);
          setNoteTextInput('');
        } catch (error) {
          console.log('error', error);
        }
      } else {
        try {
          const editData = {
            ...isNoteEditing,
            title: noteTextInput,
            description: '',
            body: '',
          };
          updateNote(editData);

          setNoteEditing(null);
          setNoteTextInput('');
        } catch (error) {
          console.log('error', error);
        }
      }
    }
  };
  useEffect(() => {
    if (isNoteEditing) {
      setNoteTextInput(isNoteEditing.title);
      refNoteInput.current.focus();
    }
  }, [isNoteEditing]);

  const handleAddBtn = (index) => {
    const uuidParams = notes.length ? notes[index].uuid : '';
    const newAItem = {
      uuid: Date.now(),
      title: '',
      body: '',
      type: 'Text',
      checked: false,
    };

    setRefUuid(uuidParams);
    // * do not remove, it just works and its dumb <---
    const newItemArr = notes;
    newItemArr.splice(index + 1, 0, newAItem);
    // * --->
    setNoteEditing(newAItem);
  };

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    setDragActive(position);
  };

  const drop = async (e) => {
    const refNote = notes[dragOverItem.current];
    const { uuid } = notes[dragItem.current];
    const refUuid = dragOverItem.current !== 0 ? refNote.uuid : null;

    const copyListItems = [...notes];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;

    const note = {
      refUuid,
      uuid,
    };

    await repositionNote(note, copyListItems);
    setDragActive(null);
  };

  const checkInputEmpty = () => {
    if (!noteTextInput) {
      const newNoteList = notes;
      const noteDeletedId = notes.findIndex(
        (data) => data.uuid === isNoteEditing.uuid
      );
      newNoteList.splice(noteDeletedId, 1);
      console.log('note not save because empty');
      setNoteEditing(null);
      return false;
    }
    return true;
  };
  return (
    <div className='home-container'>
      <div className='container-margin'>
        {notes && userInfomation?.newFirstName ? (
          <div className='home-note-container'>
            <div className='flex flex-row-reverse'>
              <h1 className='header capitalize'>
                {userInfomation &&
                  `${userInfomation?.newFirstName + ' ' + 'Notes'}`}{' '}
              </h1>
            </div>
            {notes.map((note, index) => {
              return (
                <div
                  key={note.uuid}
                  className='item-container'
                  onMouseEnter={(e) => itemHovered(note)}
                  onMouseLeave={itemNotHovered}
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  draggable
                >
                  <div
                    className={`${
                      note.uuid === hoveredItem || width < 640
                        ? 'note-opt item-hovered'
                        : 'note-opt'
                    }`}
                  >
                    <div
                      className='item-add-container'
                      onClick={() => handleAddBtn(index)}
                    >
                      <img className='item-add-icon' src={addIcon} />
                    </div>
                    <div
                      className={`${
                        note.uuid === noteOption
                          ? 'item-opt-container item-opt-active'
                          : 'item-opt-container'
                      }`}
                      onClick={() => itemClicked(note)}
                    >
                      <img className='item-opt-icon' src={noteOptionIcon} />
                    </div>
                  </div>
                  {note.uuid === noteOption ? (
                    <Options
                      list={note}
                      deleteList={deleteNote}
                      editList={editNote}
                    />
                  ) : null}

                  <Note
                    key={note.uuid}
                    id={note.uuid}
                    title={note.title}
                    date={note.createdAt}
                    items={note.items}
                    isNoteEditing={isNoteEditing}
                    refNoteInput={refNoteInput}
                    setNoteTextInput={setNoteTextInput}
                    noteTextInput={noteTextInput}
                    saveEditNote={saveEditNote}
                    className={`${
                      isDragActive === index
                        ? 'item-drag-hovered note-container'
                        : 'note-container'
                    }`}
                  />
                </div>
              );
            })}
            <InputBar
              createList={createNote}
              setInputText={setInputText}
              inputText={inputText}
            />
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}
