import { useState } from 'react'

const UploadImage = () => {
  const [file, setFile] = useState()
  const handleUpload = (event) => {
    let files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      console.log('file',e.target.result)
      setFile(e.target.result)
    }
  }

  return(
    <div className="upload-image-container">
      <form>
        <input type="file" onChange={(e)=>handleUpload(e)} />
        {file ? <img className="upload-img" src={file} /> : ''}
      </form>
    </div>
  )
}

export default UploadImage