import { View } from 'react-native'
import React, { useState } from 'react'

import ProfileCard from './components/ProfileCard'
import ProfileList from './components/ProfileList'
import LanguagePicker from './components/LanguagePicker'

import globalStyles from '../../styles/global'
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
            <View style={globalStyles.uniformContainer}>
                <ProfileCard />
                <ProfileList listOptions={listOptions} />
            </View>
        </View>
    )
}

export default ProfileScreen