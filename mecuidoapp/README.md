# mecuido app

App desenvolvido em React Native com Expo SDK v53.0.0 focado em monitoramento de saúde e bem-estar.  
Este projeto inclui um carrossel com cards de ingestão de água, IMC e sono, além de telas detalhadas para cada um desses tópicos, permitindo visualização e filtro de dados personalizados.

## Funcionalidades principais

- **Carrossel com 3 cards**:  
  - Ingestão de água  
  - Índice de Massa Corporal (IMC)  
  - Gestão do sono  

- **Cálculos personalizados**:  
  - Cálculo de idade, IMC, faixa ideal de sono e recomendação diária de ingestão de água baseada em peso e sexo.  

- **Navegação para telas detalhadas**:  
  - Tela de detalhes para cada card, com filtro por faixa de peso (água), e listas filtráveis via RNPicker e FlatList.  

- **Tema customizado**:  
  - Uso do `ThemeContext` para estilos dinâmicos conforme tema aplicado.  

## Tecnologias e bibliotecas

- React Native  
- Expo SDK 53.0.0  
- @react-native-picker/picker (v2.11.0)  
- React Navigation  
- react-native-vector-icons (MaterialIcons)  

## Estrutura principal

- `components/CardCarrossel`  
  - Componente do carrossel com scroll horizontal e cards de informações.  
  - Botão de informação que navega para a tela detalhada correspondente.  

- `screens/AguaDetalhes`  
  - Tela com RNPicker para selecionar faixa de peso e FlatList exibindo recomendações de ingestão de água.  
  - Mostra lista completa quando nenhum filtro é selecionado.  
  - Estilos dinâmicos via `ThemeContext`.  

- `contexts/UserContext` e `ThemeContext`  
  - Gerenciamento de dados do usuário e tema global.  

## Como rodar o projeto

1. Clone ou faça fork do projeto Expo no [Snack](https://snack.expo.dev/@ogabriellemos/mecuidoapp).  
2. Instale as dependências se for rodar localmente:  
   ```bash
   npm install
   expo install @react-native-picker/picker react-native-vector-icons @react-navigation/native

