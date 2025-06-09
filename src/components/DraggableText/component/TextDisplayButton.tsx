import React from 'react';
import {Pressable, Text} from 'react-native';
import {styles} from '../styles';

interface TextDisplayButtonProps {
  text: string;
  fontSize: number;
  color: string;
  fontFamily: string;
  opacity: number;
  onPress: () => void;
}

const TextDisplayButton: React.FC<TextDisplayButtonProps> = ({
  text,
  fontSize,
  color,
  fontFamily,
  opacity,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Text
        style={[
          styles.text,
          {
            fontSize,
            color,
            fontFamily,
            opacity,
          },
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default TextDisplayButton;
