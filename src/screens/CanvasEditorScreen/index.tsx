import React from 'react';
import {Keyboard, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import CanvasEditor from '../../components/Canvas/CanvasEditor';
import {useTextStore} from '../../zustand/useTextStore';
import {styles} from './styles';

export default function CanvasEditorScreen() {
  const setSelectedId = useTextStore(state => state.setSelectedId);

  const handleDismiss = () => {
    setSelectedId(null);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismiss}>
      <SafeAreaView style={styles.container}>
        <CanvasEditor />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
