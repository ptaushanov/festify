import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import globalStyles from '../../styles/global'
import { Text, Button } from 'react-native-paper'
import { firestore } from '../../../firebase.v8'

const HomeScreen = () => {

    useEffect(() => {

    }, [])

    const handlePress = () => {
        firestore.collection("users").add({
            first: "Alan",
            middle: "Mathison",
            last: "Turing",
            born: 1912
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    return (
        <View style={globalStyles.container}>
            <Text>HomeScreen</Text>
            <Button onPress={handlePress} mode="contained">Click me</Button>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})