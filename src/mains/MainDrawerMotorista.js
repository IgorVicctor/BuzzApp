import React from 'react'
import { View, Text} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import { TouchableRipple, Switch, Drawer } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

        <Draweer.Screen name='Perfil ' component={PerfilMotorista} options={{swipeEnabled: false}}/> 
        <Draweer.Screen name='Usuários' component={ListaUsuarios} options={{swipeEnabled: true}}/> 
        <Draweer.Screen name='Leitor' component={Leitor} options={{swipeEnabled: true}}/> 
        
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
          {/*<DrawerItem
            label="Ônibus"
            onPress={() => {}}
          />*/}
      </Drawer.Section>

      <Drawer.Section title='Preferences'>
          <TouchableRipple>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, paddingHorizontal: 16}}>
              <Text style={{marginTop: 15,}}>Dark Mode</Text>
              <Switch />
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section style={{marginBottom: 15, borderTopColor: '#f4f4f4', borderTopWidth: 1}}>   
        <DrawerItem        
            label="Sair"
            icon={() => (
              <Icon name="exit-to-app" size={35} color='#6558f5'/>
            )}
            onPress={() => {
            props.navigation.navigate('LoginMotorista');
            }}
          />
      </Drawer.Section>  
     </View>
  );
}

