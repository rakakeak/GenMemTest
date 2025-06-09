import {StyleSheet} from 'react-native';
import colors from '../../../themes/colors';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  canvasContainer: {
    overflow: 'hidden',
    backgroundColor: colors.canvas,
    position: 'relative',
  },
  image: {
    position: 'absolute',
  },
  dismissOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
