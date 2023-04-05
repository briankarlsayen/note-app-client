import { FaUpload, FaPen, FaTrash } from 'react-icons/fa';
const UploadImg = ({
  name,
  email,
  image,
  setUser,
  loading,
  setLoading,
  inputRef,
}) => {
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function uploadSingleImage(base64) {
    setLoading(true);
    console.log('uploading single image');
    const params = {
      name,
      email,
      image: base64,
    };
    console.log('params', params);
    setUser(params);
    setLoading(false);
  }

  const uploadImage = async (event) => {
    console.log('uploading image');
    const files = event.target.files;
    console.log(files.length);

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }
  };

  function UploadInput() {
    return (
      <div className='flex items-center justify-center w-full'>
        <label htmlFor='dropzone-file' className='flex'>
          <input
            ref={inputRef}
            onChange={uploadImage}
            id='dropzone-file'
            type='file'
            className='hidden'
            multiple
          />
        </label>
      </div>
    );
  }

  const EdiImageBtn = () => {
    return (
      <div>
        {!image ? (
          <div
            className='border-slate-300 border text-blue-500 py-2 px-4 flex gap-2 rounded-md cursor-pointer items-center hover:bg-slate-100'
            onClick={() => inputRef.current.click()}
          >
            <FaUpload />
            Upload
          </div>
        ) : (
          <div className='flex gap-2'>
            <div
              className='border-slate-300 border text-blue-500 py-2 px-4 flex gap-2 rounded-md cursor-pointer items-center hover:bg-slate-100'
              onClick={() => inputRef.current.click()}
            >
              <FaPen />
              Change
            </div>
            <div
              className='border-slate-300 border text-red-500 py-2 px-4 flex gap-2 rounded-md cursor-pointer items-center hover:bg-slate-100'
              onClick={() => setUser({ name, email, image: '' })}
            >
              <FaTrash />
              Remove
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='flex justify-center flex-col'>
      <EdiImageBtn />
      <div>
        {loading ? (
          <div className='flex items-center justify-center'>
            <p>loading</p>{' '}
          </div>
        ) : (
          <UploadInput inputRef={inputRef} />
        )}
      </div>
    </div>
  );
};

export default UploadImg;
