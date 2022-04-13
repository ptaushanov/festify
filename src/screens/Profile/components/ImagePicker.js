import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import BottomSheet from 'reanimated-bottom-sheet';
import { useTheme } from 'react-native-paper';

const ImagePicker = ({ isOpen, setOpen }) => {
    const { colors } = useTheme()

    const renderContent = () => (
        <View style={[
            styles.content,
            { backgroundColor: colors.surfacePicker }
        ]}>
            <Text>Swipe down to close</Text>
        </View>
    );

    const sheetRef = React.useRef(null);

    useEffect(() => {
        isOpen && sheetRef.current.snapTo(0)
    }, [isOpen])

    const handleImagePickerClose = () => setOpen(false)

    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={[220, 0, 0]}
            initialSnap={2}
            borderRadius={20}
            renderContent={renderContent}
            onCloseEnd={handleImagePickerClose}
        />
    );
}

export default ImagePicker

const styles = StyleSheet.create({
    content: {
        padding: 10,
        height: 220,
    }
})