import { View } from 'react-native'
import StyleSheet from "react-native-media-query"
import React, { useState } from 'react'

import ProfileCard from './components/ProfileCard'
import ProfileList from './components/ProfileList'
import LanguagePicker from './components/LanguagePicker'

import { useLanguage } from '../../contexts/LanguageContext'

const ProfileScreen = () => {
    const [lPickerOpen, setLPickerOpen] = useState(false)
    const listOptions = { setLPickerOpen }
    const { changeLocale } = useLanguage()
    const handleLanguageChange = (newLocale) => changeLocale(newLocale)

    return (
        <View>
            <LanguagePicker
                open={lPickerOpen}
                setOpen={setLPickerOpen}
                onLanguageChange={handleLanguageChange}
            />
            <View style={styles.profileContainer} dataSet={{ media: ids.profileContainer }}>
                <ProfileCard />
                <ProfileList listOptions={listOptions} />
            </View>
        </View>
    )
}

export default ProfileScreen

const { styles, ids } = StyleSheet.create({
    profileContainer: {
        padding: 25,
        marginTop: 20,
        "@media only screen and (min-width: 640px)": {
            width: "60%",
            alignSelf: "center",
        }
    }
})