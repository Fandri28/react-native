import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { api } from '../../../action/connection';

export default function EditStudent() {
    const route = useRoute();
    const navigation = useNavigation();
    const [nom, setNom] = useState('');
    const [age, setAge] = useState('');
    const [niveau, setNiveau] = useState('');
    const [mess, setMess] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = route.params; // Récupère l'ID de l'élève à modifier
    const ap = api;

    useEffect(() => {
        setLoading(true);
        // Récupérer les détails de l'élève
        const req = `${ap}/students/${id}`;
        console.log('ion ' + req);
        axios.get(req)
            .then(response => {
                const student = response.data;
                setNom(student.nom);
                setAge(student.age.toString());
                setNiveau(student.niveau);
                setLoading(false);
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Erreur de connexion au serveur');
                setLoading(false);
                console.log('ion ' + req);

            });
    }, [id]);

    const handleUpdate = () => {
        setLoading(true);
        const updatedStudent = { nom, age, niveau };
        const req = `${ap}/students/${id}`;

        axios.put(req, updatedStudent)
            .then(response => {
                setMess('Élève modifié avec succès');
                setTimeout(() => {
                    navigation.navigate('AfficheEleve');
                }, 5000); // Redirection après 5 secondes
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Erreur lors de la modification de l\'élève');
                setLoading(false);
            });
    };

    const handleCancel = () => {
        navigation.navigate('AfficheEleve');
    };

    return (
        <View style={styles.container}>
                <View style={styles.formContainer}>
                {loading && <ActivityIndicator size="large" color="#007bff" />}
                {error && <Text style={styles.error}>{error}</Text>}
                {mess && <Text style={styles.success}>{mess}</Text>}
                <Text style={styles.title}>Modifier un Élève</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    value={nom}
                    onChangeText={setNom}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Âge"
                    keyboardType="numeric"
                    value={age}
                    onChangeText={setAge}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Niveau"
                    value={niveau}
                    onChangeText={setNiveau}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Modifier" onPress={handleUpdate} color="#007bff" />
                    <Button title="Annuler" onPress={handleCancel} color="red" />
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
    }
    ,formContainer: {
        width: '80%',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },

    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        padding: 10,
        width: '100%',
        backgroundColor: '#f9f9f9',
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    error: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
    success: {
        color: 'green',
        marginBottom: 20,
        textAlign: 'center',
    },
});
