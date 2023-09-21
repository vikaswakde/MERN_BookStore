import React, { useState, useEffect } from 'react'
import BackButton from '../compenets/BackButton'
import Spinner from '../compenets/Spinner'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack'



const EditBook = () => {
  // control form data ---> 3 diffrent states ---> 
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
        setLoading(false)
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error Happend Check console',{variant: "error"})
        console.log(error);
      })
  }, [])
  const handleEditBook = () => {
    // data object
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      // edit "data" as second parameter
      // "put" ---> method is used to update the existing data
      // for this we will need "id"---> of book 
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/')
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error Occured Please Check Console',{variant: "error"})
        console.log(error);
      })
  }
  return (
    <div className='p-4'>
      {/* backbutton component */}
      <BackButton></BackButton>
      {/* 3xl ---> 3 x(x-direction <----->) large  */}
      <h1 className="text-3xl-my-4">Edit Book</h1>
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>



      </div>



    </div>
  )
}

export default EditBook