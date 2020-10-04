import { createContext, useContext } from 'react';


export const bookDetailContext = createContext(null);

export function useAppContext() {
  return useContext(bookDetailContext);
}