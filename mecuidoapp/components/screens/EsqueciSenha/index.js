import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../context/ThemeContext';
import InputField from '../../common/InputField';
import BirthdateInputField from '../../common/AniversarioInput';
import BotaoDestaque from '../../common/BotaoDestaque';
import Tooltip from '../../common/Tooltip';
import getStyles from './styles';
import firebase from 'firebase';

export default function ForgotPasswordScreen() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const styles = getStyles(theme);

  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [mostrarTooltipNascimento, setMostrarTooltipNascimento] =
    useState(false);

  async function validateAndResetPassword() {
    // Verifica se email é string e não vazio
    const usuariosSnapshot = await firebase
      .database()
      .ref('/users')
      .once('value');
    console.log('Todos os usuários:', usuariosSnapshot.val());

    console.log('birthdate:', birthdate);
    if (typeof email !== 'string' || !email.trim()) {
      Alert.alert('Erro', 'Por favor, preencha seu e-mail.');
      return;
    }

    if (!birthdate) {
      Alert.alert('Erro', 'Por favor, preencha sua data de nascimento.');
      return;
    }

    try {
      // Busca no Realtime Database pelo e-mail (convertendo para minúsculo)
      const snapshot = await firebase
        .database()
        .ref('/users')
        .orderByChild('email')
        .equalTo(email.trim().toLowerCase())
        .once('value');

      if (!snapshot.exists()) {
        Alert.alert('Erro', 'E-mail não encontrado no banco de dados.');
        return;
      }

      const usuarios = snapshot.val();
      const userId = Object.keys(usuarios)[0];
      const userData = usuarios[userId];

      if (userData.dataNascimento !== birthdate) {
        Alert.alert('Erro', 'Data de nascimento incorreta.');
        return;
      }

      await firebase.auth().sendPasswordResetEmail(email.trim().toLowerCase());
      setModalVisible(true);
    } catch (error) {
      console.error('Erro Firebase:', error);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Erro', 'E-mail não encontrado no Auth.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro', 'E-mail inválido. Verifique o formato.');
      } else {
        Alert.alert('Erro', 'Erro ao enviar e-mail: ' + error.message);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <InputField
        label="E-mail"
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        iconName="email"
        iconType="MaterialIcons"
      />

      <BirthdateInputField
        tooltip={{
          onToggle: () =>
            setMostrarTooltipNascimento(!mostrarTooltipNascimento),
        }}
        value={birthdate}
        onChangeText={setBirthdate}
        error={birthdateError}
        containerStyle={{ marginVertical: 50 }}
      />
      <Tooltip
        visible={mostrarTooltipNascimento}
        onClose={() => setMostrarTooltipNascimento(false)}
        text="Use sua data de nascimento para confirmar sua identidade com segurança."
        position={{ top: 130, left: 30 }} // ajuste conforme necessário
      />

      <BotaoDestaque
        texto="Enviar código por e-mail"
        onPress={validateAndResetPassword}
        style={{ marginTop: 70, alignSelf: 'center', width: '100%' }}
        textStyle={{ fontSize: 21 }}
      />

      {/* Modal de Sucesso */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sucesso!</Text>
            <Text style={styles.modalText}>
              Um e-mail foi enviado com instruções para redefinir sua senha.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.goBack();
              }}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
