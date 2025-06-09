import {useEffect} from 'react';
import {View} from 'react-native';
import {Gesture} from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface UseDraggableTextParams {
  id: string;
  scale: number;
  rotation: number;
  isSelected: boolean;
  onUpdateTransform: (id: string, scale: number, rotation: number) => void;
  viewRef: React.RefObject<View | null>;
}

export function useDraggableText({
  id,
  scale,
  rotation,
  isSelected,
  onUpdateTransform,
  viewRef,
}: UseDraggableTextParams) {
  // Shared values for position
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  // Scale & rotation shared values and offsets
  const scaleVal = useSharedValue(scale);
  const scaleOffset = useSharedValue(scale);
  const rotationVal = useSharedValue(rotation);
  const rotationOffset = useSharedValue(rotation);

  // Previous rotation angle for rotate gesture
  const prevRotation = useSharedValue(0);

  // Center point of the view for rotation calculation
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);

  // Sync props scale & rotation with shared values
  useEffect(() => {
    scaleVal.value = withTiming(scale);
    scaleOffset.value = scale;

    rotationVal.value = withTiming(rotation);
    rotationOffset.value = rotation;
  }, [scale, rotation]);

  // Gesture: Pan to drag the whole box
  const panGesture = Gesture.Pan()
    .enabled(isSelected)
    .onUpdate(e => {
      translateX.value = offsetX.value + e.translationX;
      translateY.value = offsetY.value + e.translationY;
    })
    .onEnd(() => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    });

  // Gesture: Pinch zoom
  const pinchGesture = Gesture.Pinch()
    .enabled(isSelected)
    .onUpdate(e => {
      scaleVal.value = scaleOffset.value * e.scale;
    })
    .onEnd(() => {
      scaleOffset.value = scaleVal.value;
      runOnJS(onUpdateTransform)(id, scaleVal.value, rotationVal.value);
    });

  // Combined gesture pan + pinch
  const combinedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  // Function to initialize rotation reference angle
  const initializeRotation = (touchX: number, touchY: number) => {
    if (viewRef.current) {
      viewRef.current.measure((_x, _y, width, height, pageX, pageY) => {
        const cx = pageX + width / 2;
        const cy = pageY + height / 2;
        centerX.value = cx;
        centerY.value = cy;

        const dx = touchX - cx;
        const dy = touchY - cy;

        prevRotation.value = Math.atan2(dy, dx);
      });
    }
  };

  // Gesture: Rotate button pan to rotate
  const rotateButtonGesture = Gesture.Pan()
    .enabled(isSelected)
    .onBegin(e => {
      runOnJS(initializeRotation)(e.absoluteX, e.absoluteY);
    })
    .onUpdate(e => {
      const dx = e.absoluteX - centerX.value;
      const dy = e.absoluteY - centerY.value;

      const angle = Math.atan2(dy, dx);
      const delta = angle - prevRotation.value;

      rotationVal.value += delta;
      prevRotation.value = angle;
    })
    .onEnd(() => {
      rotationOffset.value = rotationVal.value;
      runOnJS(onUpdateTransform)(id, scaleVal.value, rotationVal.value);
    });

  const getAnimatedStyle = () =>
    useAnimatedStyle(() => ({
      position: 'absolute',
      left: translateX.value,
      top: translateY.value,
      transform: [
        {scale: scaleVal.value},
        {rotateZ: `${rotationVal.value}rad`},
      ],
      zIndex: 100,
    }));

  return {
    combinedGesture,
    rotateButtonGesture,
    animatedStyle: getAnimatedStyle(),
  };
}
