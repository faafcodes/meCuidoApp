import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  iconName,
  iconType = 'MaterialIcons',
  showPasswordToggle,
  onTogglePassword,
  passwordVisible,
  error,
  editable = true,
  tooltip,
  onPressIn,
}) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const IconComponent = iconType === 'Ionicons' ? Ionicons : MaterialIcons;

  return (
    <View style={styles.formGroup}>
      {/* Label + ícone de info */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {tooltip && (
          <TouchableOpacity
            onPress={tooltip.onToggle}
            ref={tooltip.iconRef ? tooltip.iconRef : null}>
            <MaterialIcons
              name="info-outline"
              size={16}
              color={theme.iconColor}
              style={styles.iconInfo}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.textPrimary}
          keyboardType={keyboardType}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          editable={editable}
          onPressIn={onPressIn}
        />
        {iconName && (
          <IconComponent name={iconName} size={20} color={theme.iconColor} />
        )}
        {showPasswordToggle && (
          <TouchableOpacity onPress={onTogglePassword}>
            <Ionicons
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={20}
              color={theme.iconColor}
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
