import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useRef } from 'react'
import BottomSheet from 'reanimated-bottom-sheet';

const ImagePicker = () => {
    const renderContent = () => (
        <View style={styles.bottomUp}>
            <Text>Swipe down to close</Text>
        </View>
    )

    const sheetRef = useRef(null)

    return (
        <View>
            <View style={styles.something}>
                <Button
                    title="Open Bottom Sheet"
                    onPress={() => sheetRef.current.snapTo(0)}
                />
            </View>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[450, 300, 0]}
                borderRadius={10}
                renderContent={renderContent}
            />
        </View>
    )
}

export default ImagePicker

const styles = StyleSheet.create({
    bottomUp: {
        backgroundColor: 'white',
        padding: 16,
        height: 450,
    },
    something: {
        flex: 1,
        backgroundColor: 'papayawhip',
        alignItems: 'center',
        justifyContent: 'center',
    }
})