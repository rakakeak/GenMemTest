import {SharedValue} from 'react-native-reanimated';

export const resetCanvasTransform = (
  scale: SharedValue<number>,
  baseScale: SharedValue<number>,
  translateX: SharedValue<number>,
  translateY: SharedValue<number>,
  offsetX: SharedValue<number>,
  offsetY: SharedValue<number>,
) => {
  scale.value = 1;
  baseScale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
  offsetX.value = 0;
  offsetY.value = 0;
};

export const resetImageTransform = resetCanvasTransform;
