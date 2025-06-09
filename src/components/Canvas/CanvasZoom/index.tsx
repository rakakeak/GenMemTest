import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {ZoomableCanvasProps, ZoomableCanvasRef} from './types';
import {useImageGestures} from './hooks/useImageGestures';
import {useCanvasGestures} from './hooks/useCanvasGestures';
import {styles} from './styles';

const CanvasZoom = forwardRef<ZoomableCanvasRef, ZoomableCanvasProps>(
  (
    {children, imageUri, canvasWidth, canvasHeight, style, gestureEnabled},
    ref,
  ) => {
    const canvasScale = useSharedValue(1);
    const canvasTranslateX = useSharedValue(0);
    const canvasTranslateY = useSharedValue(0);
    const canvasBaseScale = useSharedValue(1);
    const canvasOffsetX = useSharedValue(0);
    const canvasOffsetY = useSharedValue(0);

    const imageScale = useSharedValue(1);
    const imageTranslateX = useSharedValue(0);
    const imageTranslateY = useSharedValue(0);
    const imageBaseScale = useSharedValue(1);
    const imageOffsetX = useSharedValue(0);
    const imageOffsetY = useSharedValue(0);

    const activeTarget = useSharedValue<'canvas' | 'image'>('canvas');
    const [activeTargetJS, setActiveTargetJS] = useState<'canvas' | 'image'>(
      'canvas',
    );

    const canvasGesture = useCanvasGestures(
      activeTarget,
      canvasTranslateX,
      canvasTranslateY,
      canvasOffsetX,
      canvasOffsetY,
      canvasScale,
      canvasBaseScale,
    );

    const imageGesture = useImageGestures(
      activeTarget,
      imageTranslateX,
      imageTranslateY,
      imageOffsetX,
      imageOffsetY,
      imageScale,
      imageBaseScale,
    );

    const resetCanvasTransform = () => {
      canvasScale.value = 1;
      canvasBaseScale.value = 1;
      canvasTranslateX.value = 0;
      canvasTranslateY.value = 0;
      canvasOffsetX.value = 0;
      canvasOffsetY.value = 0;
    };

    const resetImageTransform = () => {
      imageScale.value = 1;
      imageBaseScale.value = 1;
      imageTranslateX.value = 0;
      imageTranslateY.value = 0;
      imageOffsetX.value = 0;
      imageOffsetY.value = 0;
    };

    const canvasTap = Gesture.Tap()
      .maxDuration(250)
      .onEnd(() => {
        activeTarget.value = 'canvas';
        runOnJS(setActiveTargetJS)('canvas');
      });

    const imageTap = Gesture.Tap()
      .maxDuration(250)
      .onEnd(() => {
        if (activeTarget.value === 'image') {
          activeTarget.value = 'canvas';
          runOnJS(setActiveTargetJS)('canvas');
        } else {
          if (gestureEnabled) {
            activeTarget.value = 'image';
            runOnJS(setActiveTargetJS)('image');
          }
        }
      });

    const gestureToUse = gestureEnabled
      ? Gesture.Simultaneous(canvasGesture, canvasTap)
      : Gesture.Tap().enabled(false);

    const resetAllTransforms = () => {
      resetCanvasTransform();
      resetImageTransform();
    };

    useImperativeHandle(ref, () => ({
      resetTransforms: resetAllTransforms,
    }));

    useEffect(() => {
      runOnJS(resetImageTransform)();
    }, [imageUri]);

    // Sync UI thread activeTarget to JS thread
    useEffect(() => {
      const syncInterval = setInterval(() => {
        runOnJS(setActiveTargetJS)(activeTarget.value);
      }, 100);
      return () => clearInterval(syncInterval);
    }, []);

    const canvasAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {translateX: canvasTranslateX.value},
        {translateY: canvasTranslateY.value},
        {scale: canvasScale.value},
      ],
    }));

    const imageAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {translateX: imageTranslateX.value},
        {translateY: imageTranslateY.value},
        {scale: imageScale.value},
      ],
      position: 'absolute',
      borderWidth: activeTarget.value === 'image' ? 2 : 0,
      borderColor: activeTarget.value === 'image' ? 'blue' : 'transparent',
      borderStyle: 'dashed',
    }));

    return (
      <GestureHandlerRootView style={styles.root}>
        {/* For  dismissing image mode outside canvas*/}
        {activeTargetJS === 'image' && (
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {
              activeTarget.value = 'canvas';
              setActiveTargetJS('canvas');
            }}
          />
        )}

        <GestureDetector gesture={gestureToUse}>
          <Animated.View
            style={[
              {
                width: canvasWidth,
                height: canvasHeight,
              },
              styles.canvasContainer,
              canvasAnimatedStyle,
              style,
            ]}>
            {imageUri &&
              (activeTargetJS === 'image' ? (
                <GestureDetector
                  gesture={Gesture.Simultaneous(imageGesture, imageTap)}>
                  <Animated.Image
                    key="image-active"
                    source={{uri: imageUri}}
                    style={[
                      {
                        width: canvasWidth,
                        height: canvasHeight,
                      },
                      imageAnimatedStyle,
                    ]}
                    resizeMode="cover"
                  />
                </GestureDetector>
              ) : (
                <GestureDetector gesture={imageTap}>
                  <Animated.Image
                    key="image-inactive"
                    source={{uri: imageUri}}
                    style={[
                      {
                        width: canvasWidth,
                        height: canvasHeight,
                      },
                      imageAnimatedStyle,
                    ]}
                    resizeMode="cover"
                  />
                </GestureDetector>
              ))}

            {children}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    );
  },
);

export default CanvasZoom;
