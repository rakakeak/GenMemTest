import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, View, ViewStyle} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {styles} from './styles';
import {DraggableTextProps} from './types';
import {useDraggableText} from './useDraggableText';
import TextDisplayButton from './component/TextDisplayButton';
import colors from '../../themes/colors';

const CopyButton = ({onPress}: {onPress: () => void}) => (
  <Pressable onPress={onPress} style={styles.copyButton}>
    <Text style={styles.buttonText}>COPY</Text>
  </Pressable>
);

const DeleteButton = ({onPress}: {onPress: () => void}) => (
  <Pressable onPress={onPress} style={styles.deleteButton}>
    <Text style={styles.buttonText}>DEL</Text>
  </Pressable>
);

const RotateButton = ({
  gesture,
}: {
  gesture: ReturnType<typeof useDraggableText>['rotateButtonGesture'];
}) => (
  <GestureDetector gesture={gesture}>
    <View style={styles.rotateButton}>
      <Text style={styles.buttonText}>↻</Text>
    </View>
  </GestureDetector>
);

const DraggableText: React.FC<DraggableTextProps> = ({
  id,
  text,
  fontSize,
  color,
  fontFamily,
  opacity,
  scale,
  rotation,
  isSelected,
  onSelect,
  onUpdateTransform,
  onCopy,
  onDelete,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const viewRef = useRef<View>(null);

  const {combinedGesture, rotateButtonGesture, animatedStyle} =
    useDraggableText({
      id,
      scale,
      rotation,
      isSelected,
      onUpdateTransform,
      viewRef,
    });

  useEffect(() => {
    if (!isSelected && editing) {
      setEditing(false);
    }
  }, [isSelected]);

  const borderStyleValue: ViewStyle['borderStyle'] = 'dashed';

  const containerStyle = [
    styles.box,
    {
      borderColor: isSelected ? colors.primary : colors.transparent,
      borderWidth: isSelected ? 2 : 0,
      borderStyle: borderStyleValue,
      zIndex: 100,
    },
  ];

  const handleTextPress = () => {
    onSelect(id);
    setEditing(true);
  };

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View ref={viewRef} style={[animatedStyle]}>
        <View style={containerStyle}>
          {isSelected && <CopyButton onPress={() => onCopy(id)} />}
          <TextDisplayButton
            text={text}
            fontSize={fontSize}
            color={color}
            fontFamily={fontFamily}
            opacity={opacity}
            onPress={handleTextPress}
          />

          {isSelected && <DeleteButton onPress={() => onDelete(id)} />}
          {isSelected && <RotateButton gesture={rotateButtonGesture} />}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableText;
