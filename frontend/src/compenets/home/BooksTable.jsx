import { Link } from 'react-router-dom';
// import { AiOutLineEdit, AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
const BooksTable = ({books}) => {
  return (

    <table className='w-full border-separate border-spacing-2'>
    <thead>
      <tr>
        <th className="border border-slate-600 rounded-md">No</th>
        <th className="border border-slate-600 rounded-md">Title</th>
        <th className="border border-slate-600 rounded-md mx-md:hidden">Author</th>
        <th className="border border-slate-600 rounded-md mx-md:hidden">Publish Year</th>
        <th className="border border-slate-600 rounded-md">Operations</th>
      </tr>
    </thead>

    <tbody>
      {books.map((book, index) => (
        <tr key={book._id} className="h-8">
          <td className="border border-slate-700 rounded-md text-center">
            {index + 1}
          </td>
          <td className="border border-slate-700 rounded-md text-center">
            {book.title} {/* Remove + 1 */}
          </td>
          <td className="border border-slate-700 rounded-md text-center max-md:hidden">
            {book.author} {/* Remove + 1 */}
          </td>
          <td className="border border-slate-700 rounded-md text-center max-md:hidden">
            {book.publishYear} {/* Remove + 1 */}
          </td>
          <td className="border border-slate-700 rounded-md text-center">
            <div className="flex justify-content gap-x-4">
              <Link to={`/books/details/${book._id}`}>
                <BsInfoCircle className="text-2xl text-green-800 "></BsInfoCircle>
              </Link>
              <Link to={`/books/edit/${book._id}`}>
                <AiOutlineEdit className="text-2xl text-yellow-600"></AiOutlineEdit>
              </Link>
              <Link to={`/books/delete/${book._id}`}>
                <MdOutlineDelete className="text-2xl text-red-600"></MdOutlineDelete>
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>

  </table>

  
    )
}

export default BooksTable