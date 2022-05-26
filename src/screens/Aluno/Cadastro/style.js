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
            flex: 1,
            margin: 25,
            alignItems: "center",
            
        },
        input:{
            top: 10,
            padding: 5,
            marginTop:1,
            width: 355,
            height: 35,
            borderColor: '#000',
            fontSize: 16,
            fontWeight: 'bold',
            margin: "-4%",
            borderBottomWidth: 1,
            fontSize: 16,       
          },
        InputLogin:{
            alignItems: "center",            
        },
        Texto:{
            top: 10,
            color:"#6558f5",
            fontSize:22,
            marginTop: 20,
            textAlign: 'auto',
            width: 355,
        },
        botaoText:{
            color: "#FFF",
            fontSize: 18,
            fontWeight: 'bold'
        },
        botao:{
            backgroundColor: '#6558f5',
            width: 355,
            borderRadius: 6,
            paddingVertical: 8,
            marginTop: 18,
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonCadastro:{
            marginTop: 14,
            alignSelf: 'center' 
        },
        textoCadastro:{
            marginTop: 5,
            color: "#a1a1a1"
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