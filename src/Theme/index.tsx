import React from 'react';

export const themes = {
  light: {
    // Used for text
    textColorOne: '#111827', // Text and also background snackbar
    textColorTwo: '#1F2937', // First line of item in the main screen
    textColorThree: '#374151', // Color time of item in the main screen
    textColorFour: '#4B5563', // Section name in details screen, searchbar icon and separator in main screen
    // Used for widgets
    primaryColor: '#005ECB', // Appbar text/ Copy text in details screen
    // User to color large surface
    secondaryLightColor: '#F9FAFB', // Subheading
    secondaryColor: '#F3F4F6', // BackgroundColor
    secondaryDarkColor: '#E5E7EB', // Appbar background
    // For status code tag
    failedColor: '#FF5252',
    warningColor: '#FFAB40',
    successColor: '#69F0AE',
    reduxColor: '#B47CFF',
    // JSON Tree
    base00: '#F3F4F6', // secondaryColor
    base03: '#005ECB', // primaryColor
    base07: '#1F2937', // textColorTwo
    base08: '#f92672', // failedColor
    base09: '#FFAB40', // warningColor
    base0B: '#69F0AE', // successColor
    base0D: '#111827', // textColorOne
    // Others
    white: '#FFF',
    black: '#000',
  },
  dark: {
    textColorOne: '#F9FAFB',
    textColorTwo: '#D1D5DB',
    textColorThree: '#9CA3AF',
    textColorFour: '#6B7280',
    primaryColor: '#06B6D4',
    secondaryLightColor: '#374151',
    secondaryColor: '#1F2937',
    secondaryDarkColor: '#111827',
    failedColor: '#B91C1C',
    warningColor: '#D97706',
    successColor: '#4D7C0F',
    reduxColor: '#764ABC',
    base00: '#1F2937',
    base03: '#06B6D4',
    base07: '#D1D5DB',
    base08: '#B91C1C',
    base09: '#D97706',
    base0B: '#4D7C0F',
    base0D: '#F9FAFB',
    white: '#FFF',
    black: '#000',
  },
};

export const ThemeContext = React.createContext(themes.dark);
