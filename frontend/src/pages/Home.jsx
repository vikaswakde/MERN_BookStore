import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../compenets/Spinner';
import { Link } from 'react-router-dom';
// import { AiOutLineEdit, AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import BooksTable from '../compenets/home/BooksTable';
import BooksCard from '../compenets/home/BooksCard';

const Home = () => {
  // 2 states
  // state for book with an default value of an array
  const [books, setBooks] = useState([]);
  // loading state , with default value of false
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');



  // useEffect --> used to handle side effects
  // side effects --> fectching data, DOM updating , working with timer
  // first paramter --> function 
  // second paramter --> optional dependency array, --> control effect
  // no dependecy --> runs on every render 
  // emtpy array [] --> only on first render
  // props or state value --> on first render and on any value changes 

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">

        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('table')}
        > Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('card')}
        > Card
        </button>

      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl'></MdOutlineAddBox>
        </Link>
      </div>
      {/* if on loading component */}
      {loading ? (
        <Spinner></Spinner>
      ) : showType === 'table' ? (
        // else return table of Classes
        // we use "BooksTable" component
        <BooksTable books={books}></BooksTable>
      ) : (<BooksCard books={books}></BooksCard>)
      }

    </div>
  )
}

export default Home