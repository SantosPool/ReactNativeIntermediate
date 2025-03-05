import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeHttpRequest, Spinner, URL_API_REST } from '@core';

type User = {
  id: number;
  firstName: string;
  email: string;
};

export const HomeScreen = ({ route }: any) => {
  const token = route.params?.token;
  console.log(token);
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const { top } = useSafeAreaInsets();

  const handleGetUsers = async () => {
    setLoading(true);
    await makeHttpRequest({
      host: URL_API_REST,
      path: '/users?limit=5&skip=10&select=id,firstName,email',
      method: 'GET',
      token: 'Bearer ' + token,
    })
      .then(response => {
        console.log(response.users);
        setUsers(response.users);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', error.message);
        setLoading(false);
      });
  };

  const handleDeleteUser = async (id: number) => {
    setLoading(true);
    await makeHttpRequest({
      host: URL_API_REST,
      path: '/users/' + id,
      method: 'DELETE',
      token: 'Bearer ' + token,
    })
      .then(async () => {
        console.log('User deleted');
        const newUsers = users.filter(user => user.id !== id);
        setUsers(newUsers);
        //setLoading(true);
        //await handleGetUsers();
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  //console.log('users', users);
  return (
    <>
      {loading && !users ? (
        <Spinner />
      ) : (
        <View style={[styles.container, { paddingTop: top }]}>
          <Text style={styles.title}>Hola Santos Nahuat</Text>
          <Text>Lista de usuarios</Text>
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <Text>{item.firstName}</Text>
                <Text>{item.email}</Text>
                {/* <TouchableOpacity>
                  <Text>Editar</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                  <Text style={{ color: 'red' }}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ gap: 30 }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlaypenSans-Bold',
    textAlign: 'center',
  },
});
