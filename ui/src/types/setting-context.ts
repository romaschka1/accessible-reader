export type Theme = 'dark' | 'light' | 'high-contrast';
export interface ISettingsContext {
  fontSize: number;
  theme: Theme;

  setFontSize: (value: number) => void;
  setColorTheme: (value: Theme) => void;
}