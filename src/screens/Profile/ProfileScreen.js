import { View } from 'react-native'
import React from 'react'

import ProfileCard from './components/ProfileCard'
import ProfileList from './components/ProfileList'

import globalStyles from '../../styles/global'

const ProfileScreen = () => {
    return (
        <View>
            <View style={globalStyles.uniformContainer}>
                <ProfileCard />
                <ProfileList />
            </View>
        </View>
    )
}

export default ProfileScreen