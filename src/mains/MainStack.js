import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';

import Preload from '../screens/Preload';
import Login from '../screens/Aluno/Login';
import Cadastro from '../screens/Aluno/Cadastro';
import Scanner from '../screens/Motorista/Leitor';
import LoginMotorista from '../screens/Motorista/LoginMotorista';
import ListaUsuarios from '../screens/Motorista/ListaUsuarios';
import PerfilMotorista from '../screens/Motorista/PerfilMotorista';

import Perfil from '../screens/Aluno/Perfil';


import DrawerRoutesAluno from './MainDrawerAluno';
import DrawerRoutesMotorista from './MainDrawerMotorista';


const Stack = createStackNavigator();

function StackRoutes() {
  return (
    
    <Stack.Navigator
      initialRouteName='Preload'
      screenOptions={{
        headerShown: false
      }}
    >
      
      <Stack.Screen name="Preload" component={Preload}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="LoginMotorista" component={LoginMotorista}/>
      <Stack.Screen name="Cadastro" component={Cadastro}/>
      <Stack.Screen name="PerfilMotorista" component={DrawerRoutesMotorista}/>
      <Stack.Screen name="ListaUsuarios" component={ListaUsuarios}/>
      <Stack.Screen name="Scanner" component={Scanner}/>
      <Stack.Screen name="Cartao" component={DrawerRoutesAluno}/>
      <Stack.Screen name="Perfil" component={DrawerRoutesAluno}/>
      
    </Stack.Navigator>
      
  );
}

export default StackRoutes;
