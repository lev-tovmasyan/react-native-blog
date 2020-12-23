import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AboutScreen = () => {
    return (
        <View style={styles.root}>
            <Text>Better Than Nothing</Text>
        </View>
    )
}

export default AboutScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
