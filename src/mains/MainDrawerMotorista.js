import React from 'react'
import { View} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from "../config/firebaseconfig"
import PerfilMotorista from '../screens/Motorista/PerfilMotorista';
import ListaUsuarios from '../screens/Motorista/ListaUsuarios';
import Leitor from '../screens/Motorista/Leitor';

const Draweer = createDrawerNavigator();

function DrawerRoutesDois() {
  return (      
      <Draweer.Navigator 
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
        },
        
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />} initialRouteName="PerfilMotorista" >

        <Draweer.Screen name='Perfil ' component={PerfilMotorista} options={{swipeEnabled: false, unmountOnBlur: false}}/> 
        <Draweer.Screen name='Usuários' component={ListaUsuarios} options={{swipeEnabled: true, unmountOnBlur: false}}/> 
        <Draweer.Screen name='Leitor' component={Leitor} options={{swipeEnabled: true, unmountOnBlur: true}}/> 
        
      </Draweer.Navigator>
  );
}
export default DrawerRoutesDois;

function CustomDrawerContent(props) {
  return (
    <View style={{flex: 1}}>
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