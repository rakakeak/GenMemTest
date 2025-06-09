import {StyleSheet} from 'react-native';
import colors from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#222',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
    fontSize: 16,
    color: colors.canvas,
  },
  label: {
    color: colors.white,
    marginBottom: 4,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  controlBtn: {
    fontSize: 24,
    color: colors.white,
    paddingHorizontal: 12,
  },
  fontSizeText: {
    fontSize: 18,
    color: colors.white,
    paddingHorizontal: 8,
  },
  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    borderColor: colors.border,
  },
  fontTab: {
    backgroundColor: '#444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  fontTabActive: {
    backgroundColor: colors.white,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 4,
  },
  opacityValue: {
    color: colors.white,
    textAlign: 'right',
    marginBottom: 8,
  },
});
