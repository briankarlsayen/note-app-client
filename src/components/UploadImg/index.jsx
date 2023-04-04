import { useState, useRef } from 'react';

const UploadImg = ({
  name,
  email,
  image,
  setUser,
  loading,
  setLoading,
  inputRef,
}) => {
  // const [loading, setLoading] = useState(false);
  // const inputRef = useRef(null);

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

  console.log('inputRef', inputRef);

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

  console.log('hey');

  return (
    <div className='flex justify-center flex-col m-8 '>
      {/* <div>
        <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white'>
          Upload Photo
        </h2>
      </div> */}
      {/* <div>
        {url && (
          <div>
            Access you file at{' '}
            <a href={url} target='_blank' rel='noopener noreferrer'>
              {url}
            </a>
          </div>
        )}
      </div> */}
      <div className='bg-blue-300 p-4' onClick={() => inputRef.current.click()}>
        Upload
      </div>
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
