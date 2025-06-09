import {StyleProp, ViewStyle} from 'react-native';

export type TargetType = 'canvas' | 'image';

export interface ZoomableCanvasRef {
  resetTransforms: () => void;
}

export interface ZoomableCanvasProps {
  children?: React.ReactNode;
  imageUri?: string | null;
  canvasWidth: number;
  canvasHeight: number;
  style?: StyleProp<ViewStyle>;
  gestureEnabled: boolean;
}
