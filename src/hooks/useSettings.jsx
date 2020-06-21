import React from 'react';
import SettingsContext from 'context/SettingsContext';

export default function useSettings() {
  const context = React.useContext(SettingsContext);

  return context;
}