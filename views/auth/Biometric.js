import { Screen, Text, Button } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import * as React from 'react';
// import your other components

export function BiometricAuthScreen() {
    const [facialRecognitionAvailable, setFacialRecognitionAvailable] = React.useState(false);
    const [fingerprintAvailable, setFingerprintAvailable] = React.useState(false);
    const [irisAvailable, setIrisAvailable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState();

    const EResult = {
        CANCELLED: "CANCELLED",
        DISABLED: "DISABLED",
        ERROR: "ERROR",
        SUCCESS: "SUCCESS",
    }

    const checkSupportedAuthentication = async () => {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (types && types.length) {
            setFacialRecognitionAvailable(types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION));
            setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
            setIrisAvailable(types.includes(LocalAuthentication.AuthenticationType.IRIS));
        }
    };

    const authenticate = async () => {
        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const results = await LocalAuthentication.authenticateAsync();

            if (results.success) {
                setResult(EResult.SUCCESS);
                console.log(result);
            } else if (results.error === 'unknown') {
                setResult(EResult.DISABLED);
                console.log(result);
            } else if (
                results.error === 'user_cancel' ||
                results.error === 'system_cancel' ||
                results.error === 'app_cancel'
            ) {
                setResult(EResult.CANCELLED);
                console.log(result);
            }
        } catch (error) {
            setResult(EResult.ERROR);
        }

        setLoading(false);
    };

    React.useEffect(() => {
        checkSupportedAuthentication();
    }, []);

    let resultMessage;
    switch (result) {
        case result == "CANCELLED":
            resultMessage = 'Authentication process has been cancelled';
            break;
        case result == "DISABLED":
            resultMessage = 'Biometric authentication has been disabled';
            break;
        case result == "ERROR":
            resultMessage = 'There was an error in authentication';
            break;
        case result == "SUCCESS":
            resultMessage = 'Successfully authenticated';
            break;
        default:
            resultMessage = '';
            break;
    }

    let description;
    if (facialRecognitionAvailable && fingerprintAvailable && irisAvailable) {
        description = 'Authenticate with Face ID, touch ID or iris ID';
    } else if (facialRecognitionAvailable && fingerprintAvailable) {
        description = 'Authenticate with Face ID or touch ID';
    } else if (facialRecognitionAvailable && irisAvailable) {
        description = 'Authenticate with Face ID or iris ID';
    } else if (fingerprintAvailable && irisAvailable) {
        description = 'Authenticate with touch ID or iris ID';
    } else if (facialRecognitionAvailable) {
        description = 'Authenticate with Face ID';
    } else if (fingerprintAvailable) {
        description = 'Authenticate with touch ID ';
    } else if (irisAvailable) {
        description = 'Authenticate with iris ID';
    } else {
        description = 'No biometric authentication methods available';
    }

    return (
        <Screen>
            <Text>
                {description}
            </Text>
            {facialRecognitionAvailable || fingerprintAvailable || irisAvailable ? (
                <Button onPress={authenticate}>
                    Authenticate
                </Button>
            ) : null}
            {resultMessage ? <Text>{resultMessage}</Text> : null}
        </Screen>
    );
}