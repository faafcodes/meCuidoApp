import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import getStyles from './styles';

import { ThemeContext } from '../../../context/ThemeContext'; 
import Logo from '../../common/Logo';
import BotaoDestaque from '../../common/BotaoDestaque';
import LinkDestaque from '../../common/LinkDestaque';
import Versao from '../../common/Versao';
import ImagemComIndicadores from '../../common/ImagemComIndicadores';

export default function Inicio({ navigation }) {
  const { theme } = useContext(ThemeContext); // pega o tema atual
  const styles = getStyles(theme); // gera estilos com base no tema

  return (
    <View style={styles.container}>
      <Text style={styles.bemVindo}>Bem-vindo ao</Text>

      <Logo/>

      <ImagemComIndicadores
        imagens={[
          require('../../../assets/carrossel-agua.png'),
          require('../../../assets/carrossel-peso.png'),
          require('../../../assets/carrossel-sono.png'),
        ]}
      />

      <BotaoDestaque texto="Entrar" onPress={() => navigation.navigate('Login')} />

      <LinkDestaque texto="Criar Conta" onPress={() => navigation.navigate('Cadastro')} />

      <Versao numero="1.0" />
    </View>
  );
}
