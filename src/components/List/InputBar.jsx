const InputBar = ({createList, setInputText, inputText}) => {
  return(
    <form className="home-note-container item-input-display" onSubmit={(e)=>createList(e)}>
      <div className="item-input-margin"></div>  
      <input className='item-input' type='text' placeholder="Input new note" onChange={(e)=>setInputText(e.target.value)} value={inputText}/>
    </form>
  )
}

export default InputBar