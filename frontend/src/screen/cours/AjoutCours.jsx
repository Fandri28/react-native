import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import {api} from '../../../action/connection';


export default function AjoutCours() {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [succes, setSucces] = useState(null);
    const navigation = useNavigation();
    const ap = api;

    const handleAddCourse = () => {
        setError(null);
        setSucces(null);

        if (!nom || !description) {
            setError('Tous les champs sont obligatoires');
            removeMessageAfterDelay();
            return;
        }

        const newCourse = { nom, description };

        axios.post(ap+'/courses', newCourse)
            .then(response => {
                console.log('Succès, Cours ajouté avec succès');
                setSucces('Succès, Cours ajouté avec succès');
                setNom('');
                setDescription('');
                removeMessageAfterDelay();
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du cours :', error);
                setError(error.response ? error.response.data : 'Erreur de connexion au serveur');
                removeMessageAfterDelay();
            });
    };

    const handleAnnuler = () => {
        navigation.navigate('AfficheCours');
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
                <Text style={styles.title}>Ajouter un Cours</Text>
                {error && <Text style={styles.error}>{error}</Text>}
                {succes && <Text style={styles.succes}>{succes}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    value={nom}
                    onChangeText={setNom}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Ajouter" onPress={handleAddCourse} />
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
