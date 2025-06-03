import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from '../context/ThemeContext'; // ajuste o caminho conforme seu projeto

import InicioScreen from '../components/screens/Inicio/index';
import LoginScreen from '../components/screens/Login/index';
import CadastroScreen from '../components/screens/Cadastro/index';
import MainScreen from '../components/screens/TelaPrincipal/index';
import EditarInfoScreen from '../components/screens/AlterarInfo/index';
import SobreScreen from '../components/screens/Sobre/index';
import InformacoesIniciais from '../components/screens/InformacoesIniciais';
import TermosCondicoesScreen from '../components/screens/TermosCondicoes';
import PoliticaPrivacidadeScreen from '../components/screens/PoliticaPrivacidade';
import EsqueciSenha from '../components/screens/EsqueciSenha';
import AguaDetalhes from '../components/screens/AguaDetalhes';
import ImcDetalhes from '../components/screens/ImcDetalhes';
import SonoDetalhes from '../components/screens/SonoDetalhes';
import EditarInfoCards from '../components/screens/EditarInfoCards';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.headerBackground, 
        },
        headerTintColor: theme.headerText, 
      }}>
      <Stack.Screen
        name="Inicio"
        component={InicioScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: 'Entrar' }}
      />
      <Stack.Screen
        name="Cadastro"
        component={CadastroScreen}
        options={{ headerTitle: 'Criar conta' }}
      />
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditarInfo"
        component={EditarInfoScreen}
        options={{ headerTitle: 'Alterar dados' }}
      />
      <Stack.Screen
        name="Sobre"
        component={SobreScreen}
        options={{ headerTitle: 'Sobre' }}
      />
      <Stack.Screen
        name="TermosCondicoes"
        component={TermosCondicoesScreen}
        options={{ headerTitle: 'Termos & condições' }}
      />
      <Stack.Screen
        name="PoliticaPrivacidade"
        component={PoliticaPrivacidadeScreen}
        options={{ headerTitle: 'Política de privacidade' }}
      />
      <Stack.Screen
        name="InformacoesIniciais"
        component={InformacoesIniciais}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EsqueciSenha"
        component={EsqueciSenha}
        options={{ headerTitle: 'Esqueci minha senha' }}
      />
      <Stack.Screen
        name="AguaDetalhes"
        component={AguaDetalhes}
        options={{ title: 'Detalhes da água' }}
      />
      <Stack.Screen
        name="ImcDetalhes"
        component={ImcDetalhes}
        options={{ title: 'Detalhes do IMC' }}
      />
      <Stack.Screen
        name="SonoDetalhes"
        component={SonoDetalhes}
        options={{ title: 'Detalhes do sono' }}
      />
      <Stack.Screen
        name="EditarInfoCards"
        component={EditarInfoCards}
        options={{ title: 'Atualizar cards' }}
      />
    </Stack.Navigator>
  );
}