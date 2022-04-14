import React from "react";
import { StyleSheet } from "react-native";

export const Container = StyleSheet.create(
    {
        MainContainer: {
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
        },
        check:{
            width: "80%",
            flexDirection: 'row',
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 10
        },
        TextoTitulo:{
            fontSize: 33,
            marginTop: 80,
            marginBottom: 40,
            color:"#6558f5",
        },
        InputArea: {
            /*flex: 1,*/
            /*backgroundColor: "#fff",*/
            margin: 25,
            alignItems: "center",
            
        },
        input:{
            top: 10,
            /*padding: 10, */
            marginTop:1,
            width: 275,
            height: 35,
            borderColor: '#dfe6ed',
            fontSize: 16,
            fontWeight: 'bold',
            borderRadius: 4,
            borderWidth: 2,
            margin: "-4%",
            
          },
        InputLogin:{
            alignItems: "center",
                 
        },
        Texto:{
            top: 10,
            color:"#6558f5",
            fontSize:22,
            /*marginRight: 200,*/
            marginTop: 20,
            textAlign: 'auto',
            width: 275,
    
            
        },
        botaoText:{
            fontSize: 17,
            fontWeight: 'bold',
            color: '#fff'
        },
        botao:{
            width: 100,
            height: 42,
            backgroundColor: '#6558f5',
            marginTop: 20,
            borderRadius: 3,
            alignItems: 'center',
            justifyContent: 'center'
        },
        textoCadastro:{
            justifyContent:"center",
            marginTop: 20,
            fontSize: 17,
            flexDirection: "row",     
        },
        LogoBuzz: {
            marginTop: 50,
            height: 80,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",    
        },
        TextoLogo: {
            color: "#6558f5",
            fontSize: 45,
            flexDirection: "row",
        },
        contentAlert:{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        warningAlert:{
            paddingLeft: 10,
            color: "red",
            fontSize: 16
        }
    }
)
