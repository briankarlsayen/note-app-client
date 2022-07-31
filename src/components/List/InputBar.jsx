import TextareaAutosize from 'react-textarea-autosize';

const InputBar = ({createList, setInputText, inputText}) => {
  return(
    <form className="home-note-container item-input-display" onBlur={(e)=>createList(e)}>
      <div className="item-input-margin"></div>  
      <TextareaAutosize className='item-input' type='text' placeholder="Input new note" onChange={(e)=>setInputText(e.target.value)} value={inputText} maxLength={255}/>
    </form>
  )
}

export default InputBar