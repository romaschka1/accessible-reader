import { Button, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import './Header.scss';
import { useContext } from "react";
import { ReaderContext } from "../../Reader";

function Header() {
  const {
    page,
    bookmarks,
    pageSize,
    fontSize,
    changePage,
    changeFontSize,
    changeBookmarks,
  } = useContext(ReaderContext);

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
        <InputGroup>
          <InputLeftAddon>Page</InputLeftAddon>
          <Input
            value={page}
            type='number'
            onChange={e => changePage(Number(e.target.value))}
            custom-attribute="nav-entry nav-item"
            nav-component="true"
          />
        </InputGroup>
      </div>
      <div className="form-field">
        <InputGroup>
          <InputLeftAddon>Font size</InputLeftAddon>
          <Input
            value={fontSize}
            type='number'
            onChange={e => changeFontSize(Number(e.target.value))}
            custom-attribute="nav-entry nav-item"
            nav-component="true"
          />
        </InputGroup>
      </div>
    </div>

    <div className="header-item">
      <Button
        onClick={() => changeBookmarks(getBookmark() ? 'REMOVE' : 'ADD')}
        variant='outline'
        colorScheme='teal'
        custom-attribute="nav-entry nav-item"
        nav-component="true"
      >{ getBookmark() ? 'Remove bookmark' : 'Add bookmark' }</Button>
    </div>
  </div>
}

export default Header;