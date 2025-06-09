import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CanvasEditorScreen from './src/screens/CanvasEditorScreen';
import applicationStyles from './src/themes/applicationStyles';

export interface TextItem {
  id: string;
  text: string;
  fontSize: number;
  color: string;
  fontFamily: string;
  scale: number;
  rotation: number;
  opacity: number;
}

export default function App() {
  return (
    <GestureHandlerRootView style={applicationStyles.flex1}>
      <CanvasEditorScreen />
    </GestureHandlerRootView>
  );
}
