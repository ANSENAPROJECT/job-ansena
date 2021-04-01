import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {API_URL} from '@env';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native';

const TestScreen = () => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  console.log(pages);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`${API_URL}/jzl/api/api/getListUser/${pages}`)
      .then((res) => {
        console.log(res);
        setData(data.concat(res.data));
        setIsLoading(true);
      })
      .catch(({response}) => {
        console.log(response);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.containerFlat}>
        <Text>{item.name}</Text>
      </View>
    );
  };
  const renderFooter = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator size="large" color="blue" />
      </View>
    ) : null;
  };

  const handleLoadmore = () => {
    setPages(pages + 1);
    getData();
    setIsLoading(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadmore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    height: 500,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  containerFlat: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default TestScreen;
