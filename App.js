import React, { useState } from 'react';
import axios from 'axios';
import { View, Image, Button, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

// const SERVER_URL = 'http://localhost:3000'; //192.168.1.123
const SERVER_URL = 'http://localhost:3000';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });


  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  // console.log(data);

  return data;
};

const App = () => {
  const [photo, setPhoto] = useState();

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    axios.post(`${SERVER_URL}/api/upload`, {
      body: createFormData(photo, { userId: '123' }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("upload succes", response);
        alert("Upload success!");
        setPhoto(null);
      })
      .catch((error) => {
        console.log('error', error);
        alert("Upload failed!");
      });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {photo && (
        <>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
};

export default App;