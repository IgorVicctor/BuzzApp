import React from 'react'
import { View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from "../config/firebaseconfig"
import Cartao from '../screens/Aluno/Cartao';
import Perfil from '../screens/Aluno/Perfil';
import AlterarDados from '../screens/Aluno/AlterarDados';

const Draweer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <PaperProvider>
      <Draweer.Navigator 
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
        },
      
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />} initialRouteName="Perfil" >

        <Draweer.Screen name='Perfil ' component={Perfil} options={{swipeEnabled: false, unmountOnBlur: true}}/>
        <Draweer.Screen name='Cartão Virtual'  component={Cartao} options={{swipeEnabled: false, unmountOnBlur: true}}/> 
        <Draweer.Screen name='Alterar Dados'  component={AlterarDados} options={{swipeEnabled: false}}/> 
      </Draweer.Navigator>
      </PaperProvider>   
  );
}
export default DrawerRoutes;

function CustomDrawerContent(props) {
  return (
    <View style={{flex: 1}} >
      <DrawerContentScrollView {...props}  >
      <Drawer.Section style={{flex: 1, marginTop: 15, }}>
        <DrawerItemList {...props} />
      </Drawer.Section>

      </DrawerContentScrollView>

      <Drawer.Section style={{marginBottom: 15, borderTopColor: '#f4f4f4', borderTopWidth: 1}}>   
        <DrawerItem        
            label="Sair"
            icon={() => (
              <Icon name="exit-to-app" size={35} color='#6558f5'/>
            )}
            onPress={() => {
              firebase.auth().signOut().then(() => {       
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }]
              })
              }).catch((error) => {
                // An error happened.
              });;
            }}
          />
      </Drawer.Section>  
     </View>
  );
}