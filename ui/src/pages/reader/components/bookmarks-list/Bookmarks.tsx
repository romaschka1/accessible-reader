import { useContext } from 'react';
import './Bookmarks.scss';
import { ReaderContext } from '../../Reader';

function Bookmarks() {
  const { bookmarks, pageSize, changePage } = useContext(ReaderContext);

  return <div className='bookmarks-wrapper'>
    <h3 className='bookmark-item'>Bookmarks</h3>
    {bookmarks.map((bookmark: any, index: any) => (
      <button
        className='bookmark bookmark-item'
        key={index}
        onClick={() => changePage(Math.round((bookmark / pageSize) + 1))}
        custom-attribute="nav-entry nav-item"
        nav-component="true"
      >{ Math.floor((bookmark / pageSize) + 1) }</button>
    ))}
  </div>
}

export default Bookmarks;