import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, Image, StyleSheet, 
         Text, TextInput, TouchableOpacity,
         Platform } from 'react-native';

import logo from '../assets/logo.png';

import api from '../services/api';

// sempre que fosse usar div, usar View
// qualquer elemento para exibir texto usar Text
// react nao tem elemto pra form

const Login = ( { navigation } ) => {
    const [user, setUser] = useState('');

    useEffect( () => {
        AsyncStorage.getItem('user')
            .then( user => {
                console.log('user', user);
                if (user) {
                    navigation.navigate('Main', { user });
                }
            });
    }, []);

    const handleLogin = async () => {
        const response = await api.post('/devs', { username: user } );

        const { _id } = response.data;
        console.log('_id', _id);

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { user: _id });
    };

    return (
        <KeyboardAvoidingView 
            behavior="padding"
            enabled={Platform.OS === 'ios' }
            style={styles.container}
        >
            <Image source={logo} />
            <TextInput 
                autoCapitalize="none"
                autoCorrect={false}                
                placeholder="Digite seu usuário no GitHub"
                placeholderTextColor='#999' // nao tem propriedade css
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />
            <TouchableOpacity 
                onPress={handleLogin}
                style={styles.button}
                >
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    // toda propriedade com hifen utilizar camelCase
    // nao utilizar px, somente numero
    // todo componente eh display: flex e flexDirection: column
    // justifyContent: 'center', // alinha verticalmente
    // alignItems: 'center' // alinha horizontalmente

    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center', 
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
  });

export default Login;