// components/Tooltip/index.js
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

export default function Tooltip({ visible, onClose, text, position = { top: 100, left: 20 } }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={[styles.tooltip, position]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Modal>
  );
}
