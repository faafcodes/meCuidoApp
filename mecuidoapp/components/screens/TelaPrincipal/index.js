import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';

import CustomDrawer from '../../common/DrawerContent';
import getStyles from './styles';
import CardCarrossel from '../../common/CardFuncionalidades';

const Drawer = createDrawerNavigator();

function MainScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext); // Obtém o usuário diretamente do contexto
  const styles = getStyles(theme);

  useEffect(() => {
    if (!user) {
      // Redireciona para login caso o usuário não esteja logado
      navigation.navigate('Login');
    }
  }, [user, navigation]);

  if (!user) {
    // Evita exibir a tela enquanto redireciona
    return null;
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="menu" size={28} color={theme.subtitle} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Você</Text>
        <View style={{ width: 28 }} /> {/* Espaço para alinhar */}
      </View>

      {/* Saudação */}
      <View style={styles.greetingCard}>
        <View>
          <Text style={styles.greetingText}>Olá,</Text>
          <Text style={styles.userName}>
            {user?.nome?.split(' ')[0] || 'Nobre'}!
          </Text>
        </View>
        <Image
          source={require('../../../assets/leaf-icon.png')}
          style={styles.leafImage}
          resizeMode="contain"
        />
      </View>
      
      {/* Divisória */}
      <Image
        source={require('../../../assets/divider.png')}
        style={styles.imageDivider}
        resizeMode="contain"
      />

      {/* Carrossel */}
      <CardCarrossel />
    </View>
  );
}

export default function Main() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerType="front"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={MainScreen} />
    </Drawer.Navigator>
  );
}
