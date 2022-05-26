import { StyleSheet } from "react-native";

export const Container = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#6558f5'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },
    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title:{
        color: "#000",
        fontSize: 23,
        marginTop: 28
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        fontSize: 16,
        padding: 5
    },
    button:{ 
        backgroundColor: '#6558f5',
        width: "100%",
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: "#FFF",
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister:{
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText:{
        color: "#a1a1a1"
    },
    LogoBuzz: {
        marginTop: 230,
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
        marginTop: 7,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    warningAlert:{
        paddingLeft: 10,
        color: "red",
        fontSize: 16
    }
})