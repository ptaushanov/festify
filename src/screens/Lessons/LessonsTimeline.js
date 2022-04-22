import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'

import globalStyles from '../../styles/global'

const LessonsTimeline = ({ route }) => {
    const { forSeason } = route.params

    return (
        <View style={globalStyles.container}>
            <Text>{forSeason}</Text>
        </View>
    )
}

export default LessonsTimeline

const styles = StyleSheet.create({

})