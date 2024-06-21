import { Button, Input } from "@chakra-ui/react";
import './Header.scss';
import { useContext } from "react";
import { ReaderContext } from "../../Reader";

function Header() {
  const {
    page,
    bookmarks,
    pageSize,
    fontSize,
    noteMode,
    changePage,
    changeFontSize,
    changeBookmarks,
    toggleNoteMode,
    changeNotes
  } = useContext(ReaderContext);
  // const [ newNoteText, setNewNoteText ] = useState<string>('');
  let newNoteText = '';

  const getBookmark = (): boolean => {
    let haveBookmark = false;

    for (const bookmark of bookmarks) {
      if (bookmark >= (pageSize * (page-1)) && bookmark <= (pageSize * (page))) {
        haveBookmark = true;
        break;
      }
    }
    return haveBookmark;
  }

  return <div className="reader-header">
    <div className="header-item">
      <div className="form-field">
        <label>Page number</label>
        <Input
          value={page}
          type='number'
          onChange={e => changePage(Number(e.target.value))}
          custom-attribute="nav-entry nav-item"
          nav-component="true"
        />
      </div>
      <div className="form-field">
        <label>Font size</label>
        <Input
          value={fontSize}
          type='number'
          onChange={e => changeFontSize(Number(e.target.value))}
          custom-attribute="nav-entry nav-item"
          nav-component="true"
        />
      </div>
    </div>

    <div className="header-item">
      <Button
        onClick={() => changeBookmarks(getBookmark() ? 'REMOVE' : 'ADD')}
        custom-attribute="nav-entry nav-item"
        nav-component="true"
      >{ getBookmark() ? 'Remove bookmark' : 'Add bookmark' }</Button>
      <Button
        onClick={() => toggleNoteMode()}
        custom-attribute="nav-entry nav-item"
        nav-component="true"
      >Add note</Button>
    </div>
  </div>
}

export default Header;