import {StyleSheet} from 'react-native';
import colors from '../../themes/colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.neutral,
  },
  close: {
    fontSize: 20,
    color: '#888',
  },
  search: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  gridContainer: {
    paddingHorizontal: 10,
  },
  templateItem: {
    width: '30%',
    margin: '1.5%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  imageLabel: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
    color: colors.neutral,
  },
});
