import React, { cloneElement } from 'react';
import { StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';

export const Container = StyleSheet.create({
    container:{
      width:'100%',
      height: '100%',
      overflow: 'scroll', 
      backgroundColor: "#ccc"
    },
    touchMenu:{
      marginTop:40,
      backgroundColor:'#6558f5',
      width:50,
      height:50,
      zIndex:999
    },
    Texto:{
      fontSize:22,
      fontWeight: 'bold',
      padding: 5,
      color: "#6558f5",
      alignItems: 'center',

    },
    Input:{
      fontSize:20,
      color: 'white'
    },
    header:{
      height: '60%',
      backgroundColor: "#6558f5",
    },
    headerContent:{
      bottom: 55,
      padding: 30,
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
      overflow: 'scroll'
      
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      top: 20,
      marginBottom: 15,
    },
    name:{
      top: '2%',
      fontSize:22,
      color:"#ffffff",
      fontWeight:'600',
    },
    userInfo:{
      top: '2%',
      fontSize:16,
      color:"#ffffff",
      fontWeight:'600',
      
    },
    iconContent:{
      flex:1,
      alignItems:'flex-start',
      
      paddingRight:5,
    },
    icon:{
      width:30,
      height:30,
      marginTop:20,
    },
    info:{
      height:'50%',
      width:'90%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      left:'5%',
      bottom: 10
    },
    LogoBuzz: {
      height: "15%",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      bottom: 40,
    },
    TextoLogo: {
      color: "#6558f5",
      fontSize: 45,
      flexDirection: "row",
    },
});