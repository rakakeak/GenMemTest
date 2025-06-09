import {StyleSheet} from 'react-native';
import colors from '../../themes/colors';

export const styles = StyleSheet.create({
  box: {
    padding: 6,
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minWidth: 100,
    minHeight: 40,
    overflow: 'visible',
  },
  text: {
    backgroundColor: colors.transparent,
    textAlign: 'center',
  },
  textInput: {
    minWidth: 100,
    padding: 0,
    margin: 0,
    backgroundColor: colors.transparent,
    textAlign: 'center',
  },
  copyButton: {
    position: 'absolute',
    left: -60,
    top: 2,
    backgroundColor: colors.tertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  rotateButton: {
    position: 'absolute',
    bottom: -35,
    left: 0,
    backgroundColor: colors.tintmax,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  deleteButton: {
    position: 'absolute',
    right: -60,
    top: 2,
    backgroundColor: colors.red,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 12,
  },
});
