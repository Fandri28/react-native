import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Picker } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import {api} from '../../../action/connection';


export default function AjoutEvaluation() {
    
    const [selectedCourse, setSelectedCourse] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);
    const [succes, setSucces] = useState(null);
    const navigation = useNavigation();
    const ap = api;

    

    const handleAddAssessment = () => {
        setError(null);
        setSucces(null);

        if ( !type || !date) {
            setError('Tous les champs sont obligatoires');
            removeMessageAfterDelay();
            return;
        }

        const newAssessment = {
            type,
            date,
        };
        const req = ap+'/assessments'
        axios.post(req, newAssessment)
            .then(response => {
                setSucces('Évaluation ajoutée avec succès');
                setType('');
                setDate('');
                setTimeout(() => {
                    setSucces(null);
                    setError(null);
                }, 3000);
                // removeMessageAfterDelay();
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Erreur de connexion au serveur');
                // removeMessageAfterDelay();
            });
    };

    const handleAnnuler = () => {
        navigation.navigate('AfficheEvaluation');
    };

    const removeMessageAfterDelay = () => {
        setTimeout(() => {
            setError(null);
            setSucces(null);
        }, 5000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Ajouter une Évaluation</Text>
                {error && <Text style={styles.error}>{error}</Text>}
                {succes && <Text style={styles.succes}>{succes}</Text>}
                 
                <TextInput
                    style={styles.input}
                    placeholder="Type d'évaluation"
                    value={type}
                    onChangeText={setType}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date"
                    value={date}
                    onChangeText={setDate}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Ajouter" onPress={handleAddAssessment} />
                    <Button title="Retour" onPress={handleAnnuler} color="red" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    formContainer: {
        width: '80%',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    error: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
    succes: {
        color: 'green',
        marginBottom: 20,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
