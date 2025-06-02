import React, { useContext } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

export default function Tooltip({ visible, onClose, text, position = { top: 100, left: 20 } }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const { width: screenWidth } = Dimensions.get('window');

  // Garante que o tooltip não ultrapasse a tela
  const adjustedLeft = Math.min(position.left, screenWidth - 250); // 250 = largura estimada da tooltip

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View
        style={[
          styles.tooltip,
          {
            position: 'absolute',
            top: position.top,
            left: adjustedLeft,
          },
        ]}
      >
        <Text style={styles.text}>{text}</Text>
      </View>
    </Modal>
  );
}
