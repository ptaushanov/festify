import { View } from 'react-native'
import React, { useState } from 'react'

import ProfileCard from './components/ProfileCard'
import ProfileList from './components/ProfileList'
import LanguagePicker from './components/LanguagePicker'

import globalStyles from '../../styles/global'
import i18n from 'i18n-js'
import { useLanguage } from '../../contexts/LanguageContext'

const ProfileScreen = () => {
    const [lPickerOpen, setLPickerOpen] = useState(false)
    const { setLocale } = useLanguage()
    const listOptions = { setLPickerOpen }

    const handleLanguageChange = (newLocale) => {
        setLocale(newLocale)
        i18n.locale = newLocale
    }

    return (
        <View>
            <LanguagePicker
                open={lPickerOpen}
                setOpen={setLPickerOpen}
                onLanguageChange={handleLanguageChange}
            />
            <View style={globalStyles.uniformContainer}>
                <ProfileCard />
                <ProfileList listOptions={listOptions} />
            </View>
        </View>
    )
}

export default ProfileScreen