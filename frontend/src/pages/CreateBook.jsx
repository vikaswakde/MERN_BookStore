import React, { useState } from 'react'
import BackButton from '../compenets/BackButton'
import Spinner from '../compenets/Spinner'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useSnackbar} from 'notistack'


const CreateBook = () => {
  // control form data ---> 3 diffrent states ---> 
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar()
  const handleSaveBook = () => {
    // data object
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      // send "data" as second parameter
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created Sucessfully',{variant: "success"})
        navigate('/')
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('error',{variant: "error"})
        console.log(error);
      })
  }
  return (
    <div className='p-4'>
      {/* backbutton component */}
      <BackButton></BackButton>
      {/* 3xl ---> 3 x(x-direction <----->) large  */}
      <h1 className="text-3xl-my-4">Create Book</h1>
      {/* let's check loading state */}
      {/* if true ? ----- : else --- */}
      {loading ? <Spinner /> : " "}
      {/* let's have division */}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">

        {/* let's have strucute  */}
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>



      </div>



    </div>
  )
}

export default CreateBook