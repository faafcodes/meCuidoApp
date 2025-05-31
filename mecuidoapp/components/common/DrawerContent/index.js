import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CommonActions } from '@react-navigation/native';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

export default function CustomDrawer({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Inicio' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.voltar}>
        <Icon name="arrow-left" size={24} color={theme.textSecondary} />
        <Text style={styles.voltarTexto}>Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.item, styles.topBorder]}
        onPress={() => navigation.navigate('EditarInfo')}>
        <Icon name="edit-3" size={20} style={styles.icon} />
        <Text style={styles.texto}>Alterar dados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Sobre')}>
        <Icon name="users" size={20} style={styles.icon} />
        <Text style={styles.texto}>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={handleLogout}>
        <Icon name="log-out" size={20} style={styles.icon} />
        <Text style={styles.texto}>Sair</Text>
      </TouchableOpacity>

      <Text style={styles.versao}>Versão 1.0</Text>
    </View>
  );
}
