import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);

    const handleNoteChange = (index, value) => {
        const newNotes = [...notes];
        newNotes[index] = value;
        setNotes(newNotes);
    };

    const handleAddNote = () => {
        setNotes([...notes, '']);
    };

    const handleSubmit = () => {
        const userData = {
            nom,
            prenom,
            notes,
        };

        axios.post('http://localhost:3000/eleves', userData)
            .then(response => {
                console.log(notes)

                setNom('');
                setPrenom('');
                setNotes([]);
                setError(null);
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Erreur de connexion au serveur');
                console.log(notes)
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Ajouter un élève</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={nom}
                onChangeText={setNom}
            />
            <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={prenom}
                onChangeText={setPrenom}
            />

            {notes.map((note, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    placeholder={`Note ${index + 1}`}
                    keyboardType="numeric"
                    value={note}
                    onChangeText={value => handleNoteChange(index, value)}
                />
            ))}

            <Button title="Ajouter une note" onPress={handleAddNote} />
            <Button title="Soumettre" onPress={handleSubmit} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '100%',
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
});
