import React from 'react';
import {Button, View} from 'react-native';
import {styles} from './styles';

interface CanvasControlsProps {
  onOpenTemplate: () => void;
  onAddText: () => void;
}

export default function CanvasControls({
  onOpenTemplate,
  onAddText,
}: CanvasControlsProps) {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Ganti Template" onPress={onOpenTemplate} />
      <Button title="Tambah Teks" onPress={onAddText} />
    </View>
  );
}
