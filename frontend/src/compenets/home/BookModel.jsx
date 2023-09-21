import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineClose } from "react-icons/ai";



const BookModel = ({ book, onClose }) => {
    return (
      <div className='fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-60' onClick={onClose}>
            <div
                onClick={(event) => event.stopPropagation()}
                className='max-w-full md:w-[80%] lg:w-[60%] xl:w-[40%] bg-white rounded-xl p-4 flex flex-col relative'
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                ></AiOutlineClose>

                <div className="w-fit px-4 py-1 bg-red-300 rounded-lg">
                    {book.publishYear}
                </div>

                <div className="flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className="text-red-300 text-2xl"></PiBookOpenTextLight>
                    <h2 className="my-1">{book.title}</h2>
                </div>

                <div className="flex justify-start items-center gap-x-2">
                    <BiUserCircle className="text-red-300 text-2xl"></BiUserCircle>
                    <h2 className="my-1">{book.author}</h2>
                </div>
                <p className='mt-4'>Anything We want to show</p>
                <p className='my-2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, odit! Doloremque voluptatem laboriosam officiis aut ipsum possimus incidunt. Similique, quia ad? Nemo et ab voluptatibus, autem magnam suscipit. Ut voluptates, atque similique nostrum omnis totam blanditiis ducimus sunt fuga, voluptas perferendis minima rem. Dolores ipsam sed sint accusamus debitis consequuntur enim tempore non similique fugiat.
                </p>
            </div>
        </div>
    );
};

export default BookModel;
