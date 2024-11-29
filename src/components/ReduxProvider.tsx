'use client';

import { Provider } from 'react-redux';
import store from '../store/store';
// чтобы работал редакс / for working with redux(connect provider)
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}