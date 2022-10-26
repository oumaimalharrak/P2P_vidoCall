import {View, Text, StyleSheet, TextInput, Pressable, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Voximplant} from 'react-native-voximplant'
import { APP_NAME, ACC_NAME } from '../../constant';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const voximplant = Voximplant.getInstance();
    const navigation = useNavigation();

  

    useEffect(() => {
        const connect = async () => {
          const status = await voximplant.getClientState();
          if (status === Voximplant.ClientState.DISCONNECTED) {
            await voximplant.connect();
          } else if (status === Voximplant.ClientState.LOGGED_IN) {
            redirectHome();
          }
        };
    
        connect();
      }, []);
    
      const signIn =  () => {
        
            const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
           voximplant.login(fqUsername, password );
           redirectHome();
        // } 
        // catch (e) {
        //   console.log(e);
        //   Alert.alert(e.name, `Error code: ${e.code}`);
        // }
      };
    
      const redirectHome = () => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Contacts',
            },
          ],
        });
      };
  return (
    <View style={styles.page}>
      <TextInput value={username} onChangeText={setUserName} placeholder="User name" style={styles.input}  />
      <TextInput value={password} onChangeText={setPassword}  placeholder="Password" style={styles.input} secureTextEntry />

      <Pressable style={styles.button} onPress={signIn}>
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    page:{
        padding: 10,
        flex: 1,
        backgroundColor: '#ebe6e6',
        alignItems: 'stretch',
        justifyContent: 'center'
        
    },
    input:{
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        color: 'black'
    },
    button:{
        backgroundColor: '#5a70bf',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        alignItems:'center'
    }
});

export default LoginScreen;
