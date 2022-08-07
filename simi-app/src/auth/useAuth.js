import { useContext } from 'react';
import { authContext } from './ProvideAuth';

export function useAuth() {
    return useContext(authContext);
}