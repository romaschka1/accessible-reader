import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../../../app";
import { useLocation, useNavigate } from "react-router-dom";
import "./book-list.scss";

function BookList() {
  const { books } = useContext(BooksContext);
  const [currentBookId, setCurrentBookId] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentBookId(location?.state?.id);
  }, [location, currentBookId]);

  const openBook = (id: string) => {
    navigate('/book/' + id, { state: { id } });
  }

  return <ul className="book-list" custom-attribute="nav-entry nav-container" nav-component="true" nav-id="book-list">
    {books.map((book, index) => {
      return (
        <li key={index} className="default">
          <button
            onClick={() => openBook(book._id)}
            className={`book-item ${book._id === currentBookId ? 'active' : ''}`}
            custom-attribute="nav-child"
            nav-component="true"
            nav-id="book-list"
          >{ book.name }</button>
        </li>
      );
    })}
  </ul>;
} 

export default BookList;