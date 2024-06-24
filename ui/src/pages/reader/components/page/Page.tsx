import "./Page.scss";
import { useContext } from "react";
import { ReaderContext } from "../../Reader";
import { ChevronRight, ChevronLeft } from 'react-feather';
import { Button } from "@chakra-ui/react";

function Page() {
  const { bookmarks, page, pageSize, fontSize, pageData, changePage } = useContext(ReaderContext); 

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

  return <div className="page-wrapper">
    <Button
      className="change-page-btn"
      onClick={() => changePage(page-1)}
      variant='ghost'
      colorScheme='teal'
      custom-attribute="nav-entry nav-item"
      nav-component="true"
    ><ChevronLeft size={60}/></Button>
    <div className="text-wrapper">
      { getBookmark() && <div className="bookmark"></div> }

      {/* <textarea cols={60} rows={8} value="This is my statement one.&#13;&#10;This is my statement2"></textarea> */}

      <div className="text-container" style={{fontSize : fontSize}} dangerouslySetInnerHTML={{__html: pageData[page-1].toString()}}></div>

      <div className="footer">
        {page}/{pageData.length}
      </div>
    </div>
    <Button
      className="change-page-btn"
      onClick={() => changePage(page+1)}
      variant='ghost'
      colorScheme='teal'
      custom-attribute="nav-entry nav-item"
      nav-component="true"
    ><ChevronRight size={60}/></Button>
  </div>
}

export default Page;