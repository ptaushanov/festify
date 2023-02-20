import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import BottomSheet from 'reanimated-bottom-sheet';
import { useTheme, Text, TouchableRipple, Divider } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons"
import i18n from 'i18n-js';
import * as ExpoImagePicker from "expo-image-picker"

const ImagePicker = ({ isOpen, setOpen, setImage }) => {
    const { colors } = useTheme()
    const sheetRef = React.useRef(null);

    const runAfterSelectAction = (result) => {
        if (!result.canceled) {
            const [image] = result.assets
            setImage(image.uri)
        }
        sheetRef.current.snapTo(2)
    }

    const handlePickFromCamera = async () => {
        const result = await ExpoImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        runAfterSelectAction(result)
    }

    const handlePickFromGallery = async () => {
        const result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        runAfterSelectAction(result)
    }

    const renderContent = () => (
        <View style={[
            styles.content,
            { backgroundColor: colors.surfacePicker }
        ]}>
            <View style={[
                styles.bar,
                { backgroundColor: colors.onSurface }
            ]} />
            <View>
                <Text style={styles.title}>
                    {i18n.t("change-profile:Choose from")}
                </Text>
                <View style={styles.optionsContainer}>
                    <TouchableRipple onPress={handlePickFromCamera} style={styles.rippleContainer}>
                        <View style={styles.option}>
                            <MaterialIcons
                                name="camera-alt"
                                size={26}
                                color={colors.onSurface}
                            />
                            <Text style={styles.optionText}>{i18n.t("change-profile:Camera")}</Text>
                        </View>
                    </TouchableRipple>
                    <Divider style={styles.divider} />
                    <TouchableRipple onPress={handlePickFromGallery} style={styles.rippleContainer}>
                        <View style={styles.option}>
                            <MaterialIcons
                                name="photo"
                                size={26}
                                color={colors.onSurface}
                            />
                            <Text style={styles.optionText}>{i18n.t("change-profile:Gallery")}</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </View>
        </View>
    );

    useEffect(() => {
        isOpen && sheetRef.current.snapTo(0)
    }, [isOpen])

    const handleImagePickerClose = () => setOpen(false)

    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={[220, 0, 0]}
            initialSnap={2}
            borderRadius={30}
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
    },
    bar: {
        height: 6,
        width: "20%",
        marginHorizontal: "40%",
        borderRadius: 4
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 15
    },
    optionsContainer: {
        marginHorizontal: 25,
        marginTop: 20
    },
    option: {
        flexDirection: "row",
        alignItems: "center"
    },
    optionText: {
        fontSize: 18,
        marginLeft: 10
    },
    rippleContainer: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10
    },
    divider: {
        marginVertical: 5,
    }
})