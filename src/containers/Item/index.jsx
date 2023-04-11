import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import addIcon from '../../assets/icons/add.svg';
import noteOptionIcon from '../../assets/icons/note-options.svg';
import backIcon from '../../assets/icons/back.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import Skeleton from '../../components/Skeleton';
import Options from '../../components/List/Options';
import InputBar from '../../components/List/InputBar';
import { isUuid, isURL } from '../../middlewares/validator';
import useWindowDimensions from '../../components/useWindowDimensions';
import TextareaAutosize from 'react-textarea-autosize';
import { itemDetailsStore } from '../../store/ItemsStore';
import { shallow } from 'zustand/shallow';

function Item() {
  const { id } = useParams();
  const [inputText, setInputText] = useState('');
  const [hoveredItem, setHoveredItem] = useState();
  const [itemOption, setItemOption] = useState('');
  const [isItemEditing, setItemEditing] = useState('');
  const [editTextInput, setEditTextInput] = useState('');
  const [isDragActive, setDragActive] = useState();
  const [isRefUuid, setRefUuid] = useState('');
  const [createItemCB, setCreateItemCB] = useState(false);

  const [fullHeader, setFullHeader] = useState(false);

  const refNoteInput = useRef(null);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const navigate = useNavigate();
  const { height, width } = useWindowDimensions();

  const {
    note,
    items,
    storeItems,
    storeNote,
    addItem,
    updateCheckedItem,
    removeItem,
    repositionItem,
    updateItem,
  } = itemDetailsStore((state) => state, shallow);

  useEffect(() => {
    getItemDetails();
    getNote();
  }, []);

  useEffect(() => {
    if (isItemEditing) {
      setEditTextInput(isItemEditing.title);
      refNoteInput.current.focus();
    }
  }, [isItemEditing]);

  const getItemDetails = async () => {
    if (isUuid(id) === false) {
      navigate('/404');
    } else {
      try {
        storeItems(id);
      } catch (error) {
        console.log('error', error);
      }
    }
  };
  const getNote = async () => {
    if (isUuid(id) === false) {
      navigate('/404');
    } else {
      try {
        storeNote(id);
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const createItem = async (e) => {
    e.preventDefault();
    try {
      const lastItemUuid = items.length ? items[items.length - 1].uuid : null;
      let params;
      if (!inputText) return null;
      if (isURL(inputText)) {
        setCreateItemCB(true);
        params = {
          noteUuid: id,
          title: inputText,
          body: '',
          type: 'Bookmark',
          refUuid: lastItemUuid,
          loc: 'last',
        };
      } else {
        params = {
          noteUuid: id,
          title: inputText,
          body: '',
          type: 'Text',
          refUuid: lastItemUuid,
          loc: 'last',
        };
      }
      console.log('before addItem');
      const newItem = addItem(params);
      if (newItem) {
        setCreateItemCB(false);
        setInputText('');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const finishItem = async (params) => {
    try {
      const updatedData = {
        ...params,
        checked: !params.checked,
      };
      updateCheckedItem(updatedData);
    } catch (error) {
      console.log('error', error);
    }
  };
  const itemHovered = (item) => {
    if (!itemOption) return setHoveredItem(item.uuid);
  };
  const itemClicked = (item) => {
    if (item.uuid === itemOption) {
      setItemOption('');
    } else {
      setItemOption(item.uuid);
      setHoveredItem(item.uuid);
    }
  };
  const deleteItem = async (item) => {
    try {
      setItemOption('');
      removeItem(item);
    } catch (error) {
      console.log('error', error);
    }
  };
  const saveEditItem = async (e) => {
    if (editTextInput) return null;
    if (isItemEditing) {
      if (e.type === 'submit') e.preventDefault();
      setItemOption('');
      if (isRefUuid) {
        try {
          let params;
          if (isURL(editTextInput)) {
            params = {
              noteUuid: id,
              title: editTextInput,
              refUuid: isRefUuid,
              body: '',
              description: '',
              type: 'Bookmark',
              checked: false,
              isItemEditing,
              loc: 'middle',
            };
          } else {
            params = {
              noteUuid: id,
              title: editTextInput,
              refUuid: isRefUuid,
              body: '',
              description: '',
              type: 'Text',
              checked: false,
              isItemEditing,
              loc: 'middle',
            };
          }

          addItem(params);
          setRefUuid('');
          setItemEditing('');
        } catch (error) {
          console.log('error', error);
        }
      } else {
        try {
          const params = {
            ...isItemEditing,
            title: editTextInput,
            description: '',
            body: '',
          };

          updateItem(params);
          setItemEditing('');
        } catch (error) {
          console.log('error', error);
        }
      }
    }
  };
  const editItem = async (item) => {
    setItemEditing(item);
  };

  const itemNotHovered = () => {
    if (!itemOption) setHoveredItem('');
  };

  const handleOptionClick = (e) => {
    const restrictClass = [
      'item-input',
      'note-opt-icon',
      'item-opt-icon',
      'item-opt-active',
      'note-opt-item',
    ];
    let restrict = true;
    for (let item1 of restrictClass) {
      for (let item2 of e.target.classList) {
        if (item1 === item2) restrict = false;
      }
    }
    if (itemOption) {
      if (restrict) {
        if (e.target.className !== 'item-opt-container') {
          setItemOption('');
          setHoveredItem('');
          // TODO save only if changed
          saveEditItem(e);
        }
      }
    }
  };

  const handleAddBtn = (index) => {
    const uuidParams = items.length ? items[index].uuid : '';
    const newAItem = {
      uuid: Date.now(),
      title: '',
      body: '',
      type: 'Text',
      checked: false,
    };
    setRefUuid(uuidParams);
    const newItemArr = items;
    newItemArr.splice(index + 1, 0, newAItem);
    // setItems(newItemArr);
    setItemEditing(newAItem);
  };

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    setDragActive(position);
  };

  const drop = async (e) => {
    const refNote = items[dragOverItem.current];
    const { uuid } = items[dragItem.current];
    const refUuid = dragOverItem.current !== 0 ? refNote.uuid : null;

    const copyListItems = [...items];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;

    const item = {
      refUuid,
      uuid,
    };
    await repositionItem(item, copyListItems);
    setDragActive(null);
  };

  return (
    <div className='home-container' onMouseDown={(e) => handleOptionClick(e)}>
      <div className='container-margin'>
        {items ? (
          <div className='home-note-container'>
            <div
              onClick={() => setFullHeader(!fullHeader)}
              className='flex flex-row-reverse'
            >
              <h1
                className={
                  !fullHeader
                    ? 'header item-header limit-text-lenght'
                    : 'header item-header'
                }
              >
                {note.title}
              </h1>
            </div>
            {items.map((item, index) => {
              return (
                <div
                  key={item.uuid}
                  className='item-container'
                  onMouseEnter={(e) => itemHovered(item)}
                  onMouseLeave={itemNotHovered}
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  draggable
                >
                  <div
                    className={`${
                      item.uuid === hoveredItem || width < 640
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
                        item.uuid === itemOption
                          ? 'item-opt-container item-opt-active'
                          : 'item-opt-container'
                      }`}
                      onClick={() => itemClicked(item)}
                    >
                      <img className='item-opt-icon' src={noteOptionIcon} />
                    </div>
                  </div>
                  {item.uuid === itemOption ? (
                    <Options
                      list={item}
                      deleteList={deleteItem}
                      editList={editItem}
                    />
                  ) : null}

                  {item.type === 'Text' && (
                    <ItemList
                      title={item.title}
                      checked={item.checked}
                      item={item}
                      finishItem={finishItem}
                      saveEditItem={saveEditItem}
                      refNoteInput={refNoteInput}
                      editTextInput={editTextInput}
                      setEditTextInput={setEditTextInput}
                      isItemEditing={isItemEditing}
                      className={`${
                        isDragActive === index
                          ? 'item-drag-hovered note-container'
                          : 'note-container'
                      }`}
                    />
                  )}
                  {item.type === 'Bookmark' && (
                    <ItemBookmark
                      url={item.title}
                      title={item.preview ? item.preview.title : item.title}
                      body={item.body}
                      description={
                        item.preview ? item.preview.description : item.title
                      }
                      image={item.preview ? item.preview.image.data : null}
                      type={item.preview ? item.preview.type : null}
                      imageUrl={item.preview ? item.preview.imageUrl : null}
                      item={item}
                      isDragActive={isDragActive}
                      index={index}
                      className={`${
                        isDragActive === index
                          ? 'item-drag-hovered item-bookmark-container'
                          : 'item-bookmark-container'
                      }`}
                    />
                  )}
                  <div className='item-list-margin'></div>
                </div>
              );
            })}
            {createItemCB ? (
              <BookmarkSkeleton />
            ) : (
              <InputBar
                createList={createItem}
                setInputText={setInputText}
                inputText={inputText}
              />
            )}
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}

const ItemList = ({
  title,
  checked,
  item,
  finishItem,
  isItemEditing,
  refNoteInput,
  saveEditItem,
  setEditTextInput,
  editTextInput,
  className,
}) => {
  return (
    <div className='item-list-container'>
      {isItemEditing.uuid === item.uuid ? (
        <form className='home-note-container' onBlur={(e) => saveEditItem(e)}>
          <TextareaAutosize
            ref={refNoteInput}
            className='item-input'
            type='text'
            value={editTextInput}
            onChange={(e) => setEditTextInput(e.target.value)}
            maxLength={255}
          />
        </form>
      ) : (
        <div className={className} onClick={() => finishItem(item)}>
          <p className={checked ? `title checked` : 'title'}>
            {title ? title : ''}
          </p>
        </div>
      )}
    </div>
  );
};

const ItemBookmark = ({
  url,
  title,
  body,
  description,
  image,
  type,
  item,
  imageUrl,
  className,
}) => {
  function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  const base64String = _arrayBufferToBase64(image);
  let convertImg = `data:${type};base64,${base64String}`;
  return (
    <div className={className}>
      <div
        className='item-bookmark item-bookmark-hover'
        onClick={() => window.open(url, '_blank')}
      >
        {/* <div onClick={()=> window.open(url, "_blank")} className={`${isDragActive === index ? 'item-drag-hovered item-bookmark' : 'item-bookmark'}`}> */}
        <div className='item-bookmark-left'>
          <p className='item-bookmark-title'>{title}</p>
          <p className='item-bookmark-description'>{description}</p>
          <p className='item-bookmark-url'>{url}</p>
        </div>
        {type && type === 'url' ? (
          <div className='item-bookmark-right'>
            <img src={imageUrl} alt={title} />
          </div>
        ) : (
          <div className='item-bookmark-right'>
            <img src={convertImg} alt={title} />
          </div>
        )}
      </div>
    </div>
  );
};

const BookmarkSkeleton = () => {
  return (
    <div className='item-container align-middle items-center animate-pulse'>
      <div className='h-7 w-7 mr-2 rounded-sm animate-pulse'></div>
      <div className='h-7 w-7 mr-2 rounded-sm animate-pulse'></div>
      <div className='item-bookmark bg-gray-200'></div>
      <div className='item-list-margin'></div>
    </div>
  );
};

export default Item;
