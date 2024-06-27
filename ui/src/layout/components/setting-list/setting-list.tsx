import { FormLabel, Radio, RadioGroup, Stack, useColorMode } from '@chakra-ui/react';
import './setting-list.scss';
import { useContext } from 'react';
import { SettingsContext } from '../../../app';
import { Theme } from '../../../types/setting-context';

function SettingList() {
  const { theme, setColorTheme } = useContext(SettingsContext);
  const { setColorMode } = useColorMode();

  const setTheme = (themeValue: string) => {
    if (themeValue === 'light' || themeValue === 'dark') {
      setColorMode(themeValue);
    }

    setColorTheme(themeValue as Theme);
    localStorage.setItem('theme', themeValue);
  }

  return <ul className="setting-list">
    <li className="default">
      <div
        className="list-item"
        custom-attribute="nav-entry nav-container"
        nav-component="true"
        nav-id="settings-theme-list"
      >
        <FormLabel mb='0' htmlFor='isDarkMode'>Theme</FormLabel>
        <RadioGroup onChange={(e) => setTheme(e)} value={theme}>
          <Stack direction='column'>
            <Radio
              colorScheme='teal'
              value='light' 
              custom-attribute="nav-child"
              nav-component="true"
              nav-id="settings-theme-list"
            >Light</Radio>
            <Radio
              colorScheme='teal'
              value='dark' 
              custom-attribute="nav-child"
              nav-component="true"
              nav-id="settings-theme-list"
            >Dark</Radio>
            <Radio
              colorScheme='teal'
              value='high-contrast' 
              custom-attribute="nav-child"
              nav-component="true"
              nav-id="settings-theme-list"
            >High contrast</Radio>
          </Stack>
        </RadioGroup>
      </div>
    </li>
  </ul>
}

export default SettingList;