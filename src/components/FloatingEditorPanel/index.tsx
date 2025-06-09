import Slider from '@react-native-community/slider';
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {COLOR_PALETTE} from '../../constants';
import colors from '../../themes/colors';
import {styles} from './styles';

interface Props {
  text: string;
  onChangeText: (text: string) => void;
  fontSize: number;
  color: string;
  opacity: number;
  onChangeFontSize: (size: number) => void;
  onChangeColor: (color: string) => void;
  onChangeOpacity: (opacity: number) => void;
}

const FloatingEditorPanel: React.FC<Props> = ({
  text,
  onChangeText,
  fontSize,
  color,
  opacity,
  onChangeFontSize,
  onChangeColor,
  onChangeOpacity,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={colors.canvas}
        value={text}
        onChangeText={onChangeText}
        placeholder="Edit text here"
      />
      <Text style={styles.label}>Font Size</Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => onChangeFontSize(Math.max(1, fontSize - 1))}>
          <Text style={styles.controlBtn}>−</Text>
        </TouchableOpacity>
        <Text style={styles.fontSizeText}>{fontSize}</Text>
        <TouchableOpacity onPress={() => onChangeFontSize(fontSize + 1)}>
          <Text style={styles.controlBtn}>＋</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Color</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.row}>
        {COLOR_PALETTE.map(c => (
          <TouchableOpacity
            key={c}
            style={[
              styles.colorCircle,
              {backgroundColor: c, borderWidth: c === color ? 2 : 0},
            ]}
            onPress={() => onChangeColor(c)}
          />
        ))}
      </ScrollView>

      <Text style={styles.label}>Opacity</Text>
      <Slider
        style={styles.slider}
        minimumValue={0.1}
        maximumValue={1}
        value={opacity}
        onValueChange={onChangeOpacity}
        minimumTrackTintColor={colors.tintmin}
        maximumTrackTintColor={colors.tintmax}
        thumbTintColor={colors.tintmin}
      />
      <Text style={styles.opacityValue}>{Math.round(opacity * 100)}%</Text>
    </View>
  );
};

export default FloatingEditorPanel;
