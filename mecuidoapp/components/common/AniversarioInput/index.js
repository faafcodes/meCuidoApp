import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';
import getStyles from './styles';

export default function BirthdateInputField({ tooltip, error, value, onChangeText }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  // Converte o value (string ISO) para Date, se necessário
  const birthdate = value ? new Date(value) : null;

  const [errorMessage, setErrorMessage] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const formattedDate = birthdate
    ? new Intl.DateTimeFormat('pt-BR').format(birthdate)
    : 'Selecionar data';

  const handleChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (selectedDate) {
      const today = new Date();
      const age = today.getFullYear() - selectedDate.getFullYear();
      const hasHadBirthdayThisYear =
        today.getMonth() > selectedDate.getMonth() ||
        (today.getMonth() === selectedDate.getMonth() &&
          today.getDate() >= selectedDate.getDate());

      const isAtLeast13 = age > 13 || (age === 13 && hasHadBirthdayThisYear);

      if (!isAtLeast13) {
        setErrorMessage('Você deve ter pelo menos 13 anos.');
        return;
      }

      setErrorMessage('');
      // Notifica o componente pai que a data mudou
      onChangeText(selectedDate.toISOString());
    }
  };

  return (
    <View style={styles.formGroup}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Data de Nascimento</Text>
        {tooltip && (
          <TouchableOpacity onPress={tooltip.onToggle} ref={tooltip.iconRef || null}>
            <MaterialIcons
              name="info-outline"
              size={16}
              color={theme.iconColor}
              style={styles.iconInfo}
            />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}>
        <Text style={[styles.input, { color: birthdate ? theme.subtitle : theme.textPrimary }]}>
          {formattedDate}
        </Text>
        <MaterialIcons
          name="calendar-today"
          size={20}
          color={theme.iconColor}
          style={styles.rightIcon}
        />
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}
      {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}

      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={birthdate || new Date(2000, 0, 1)}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal transparent animationType="slide" visible={showPicker}>
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000066' }}>
            <View style={{ backgroundColor: theme.background, padding: 16 }}>
              <DateTimePicker
                value={birthdate || new Date(2000, 0, 1)}
                mode="date"
                display="spinner"
                onChange={handleChange}
                maximumDate={new Date()}
              />
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text style={{ color: theme.brand, textAlign: 'right', marginTop: 10 }}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

