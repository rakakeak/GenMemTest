import {Gesture} from 'react-native-gesture-handler';
import {SharedValue} from 'react-native-reanimated';
import {TargetType} from '../types';

export const useCanvasGestures = (
  activeTarget: SharedValue<TargetType>,
  translateX: SharedValue<number>,
  translateY: SharedValue<number>,
  offsetX: SharedValue<number>,
  offsetY: SharedValue<number>,
  scale: SharedValue<number>,
  baseScale: SharedValue<number>,
): ReturnType<typeof Gesture.Simultaneous> => {
  const pan = Gesture.Pan()
    .onBegin(() => activeTarget.value === 'canvas')
    .onUpdate(event => {
      if (activeTarget.value !== 'canvas') return;
      translateX.value = offsetX.value + event.translationX;
      translateY.value = offsetY.value + event.translationY;
    })
    .onEnd(() => {
      if (activeTarget.value !== 'canvas') return;
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    });

  const pinch = Gesture.Pinch()
    .onBegin(() => activeTarget.value === 'canvas')
    .onUpdate(event => {
      if (activeTarget.value !== 'canvas') return;
      const newScale = Math.max(1, Math.min(baseScale.value * event.scale, 5));
      scale.value = newScale;
    })
    .onEnd(() => {
      if (activeTarget.value !== 'canvas') return;
      baseScale.value = scale.value;
    });

  return Gesture.Simultaneous(pan, pinch);
};
