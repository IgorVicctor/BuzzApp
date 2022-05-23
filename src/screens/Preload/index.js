import React, { useEffect } from "react";
import {Container} from './style';
import {Text, View, ActivityIndicator} from 'react-native';
import Onibus from '../../img/Onibus.svg';

export default function Preload ({navigation}) {

    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{name: "Login"}]
            })
        }, 1500)
    }, [])
      
return (
    <View style = {Container.Container}>
        <Onibus width="100%" height="175" />
        <Text style={Container.Texto} >BUZZ</Text>
        <ActivityIndicator size={45} color={"#6558f5"}/>
     </View>
    );
}