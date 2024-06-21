import { useEffect, useState } from 'react';
import './Sidebar.scss';
import { Home, List, Settings } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';
import BookList from './components/book-list/book-list';
import SettingList from './components/setting-list/setting-list';

function Sidebar () {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sidebarContent, setSidebarContent] = useState<string>('');

  useEffect(() => {
    setCurrentPath(location.pathname);
    toggleSidebar(location.pathname.includes('/book/') ? 'book-list' : '');
  }, [location]);

  const toggleSidebar = (content: string) => {
    if (content) {
      setSidebarOpen(sidebarContent === content ? !sidebarOpen : true);
      setSidebarContent(content);
    } else {
      setSidebarOpen(false);
    }
  }

  return <div className="sidebar">
    <ul className="navigation-wrapper" custom-attribute="nav-entry nav-container" nav-component="true" nav-id="navigation-list">
      <li>
        <button
          onClick={() => navigate('/')}
          className={`nav-item ${currentPath === '/' ? 'active' : ''}`}
          custom-attribute="nav-child"
          nav-component="true"
          nav-id="navigation-list"
        ><Home size={30}/></button>
      </li>
      <li>
        <button
          className={`nav-item ${currentPath.includes('/book/') ? 'active' : ''}`}
          onClick={() => toggleSidebar('book-list')}
          custom-attribute="nav-child"
          nav-component="true"
          nav-id="navigation-list"
        ><List size={30}/></button>
      </li>
      <li>
        <button
          className="nav-item"
          onClick={() => toggleSidebar('settings')}
          custom-attribute="nav-child"
          nav-component="true"
          nav-id="navigation-list"
        ><Settings size={30}/></button>
      </li>
    </ul>

    { sidebarOpen && <div className="sidebar-content">
      { sidebarContent === 'book-list' && <BookList></BookList> }
      { sidebarContent === 'settings' && <SettingList></SettingList> }
    </div> }
  </div>
}

export default Sidebar;