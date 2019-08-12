import React, {Fragment} from 'react';
import Login from './pages/Login';
import { YellowBox} from 'react-native';
import Routes from './routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <Routes />
    
  );
}



