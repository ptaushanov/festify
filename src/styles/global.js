import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    paddedContainer: {
        padding: 40,
        marginTop: 20
    },
    slimContainer: {
        padding: 20,
        flex: 1
    },
    borderTrace: {
        borderColor: "red",
        borderWidth: 2,
    }
})