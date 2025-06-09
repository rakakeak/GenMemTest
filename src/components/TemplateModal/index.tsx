import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {templateImages} from '../../constants';
import {styles} from './styles';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (uri: string) => void;
};

const TemplateModal: React.FC<Props> = ({visible, onClose, onSelect}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Ganti template</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={templateImages}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={styles.gridContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.templateItem}
                onPress={() => {
                  onSelect(item.uri);
                  onClose();
                }}>
                <Image source={{uri: item.uri}} style={styles.image} />
                <Text style={styles.imageLabel} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default TemplateModal;
