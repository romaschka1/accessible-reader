import { useEffect, useState } from 'react';
import './Sidebar.scss';
import { Home, List, Settings } from 'react-feather';
import { useLocation, useNavigate } from 'react-router-dom';
import BookList from './components/book-list/book-list';

function Sidebar () {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sidebarContent, setSidebarContent] = useState<string>('');

  useEffect(() => {
    setCurrentPath(location.pathname);
    toggleSidebar(location.pathname.includes('/book/'));
  }, [location]);

  const toggleSidebar = (value?: boolean) => {
    if (value === undefined) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarOpen(value);
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
          onClick={() => {toggleSidebar(); setSidebarContent('book-list')}}
          custom-attribute="nav-child"
          nav-component="true"
          nav-id="navigation-list"
        ><List size={30}/></button>
      </li>
      <li>
        <button
          className="nav-item"
          onClick={() => {toggleSidebar(); setSidebarContent('settings')}}
          custom-attribute="nav-child"
          nav-component="true"
          nav-id="navigation-list"
        ><Settings size={30}/></button>
      </li>
    </ul>

    { sidebarOpen && <BookList></BookList> }
  </div>
}

export default Sidebar;