import { FormLabel, Switch, useColorMode } from '@chakra-ui/react';
import './setting-list.scss';

function SettingList() {
  const { colorMode, toggleColorMode } = useColorMode();

  const toggleMode = () => {
    toggleColorMode();
    localStorage.setItem('theme', colorMode);
  }

  return <ul className="setting-list">
    <li className="default">
      <div className="list-item">
        <FormLabel mb='0' htmlFor='isDarkMode'>Dark Mode</FormLabel>
        <Switch
          id='isDarkMode'
          custom-attribute="nav-entry nav-item"
          nav-component="true"
          isChecked={colorMode === 'dark'}
          onChange={() => toggleMode()}
        />
      </div>
    </li>
  </ul>
}

export default SettingList;