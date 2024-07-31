import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import PieChart from 'react-native-pie-chart';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { api } from '../../../action/connection';

export default function ReportCard() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [assessments, setAssessments] = useState([]);
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const ap = api;

    useEffect(() => {
        fetchStudents();
        fetchAssessments();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (selectedStudent && selectedAssessment) {
                fetchGrades(selectedStudent, selectedAssessment);
            }
        }, [selectedStudent, selectedAssessment])
    );

    const fetchStudents = () => {
        setLoading(true);
        axios.get(`${ap}/students`)
            .then(response => {
                setStudents(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des élèves :', error);
                setLoading(false);
            });
    };

    const fetchAssessments = () => {
        axios.get(`${ap}/assessments`)
            .then(response => {
                setAssessments(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des évaluations :', error);
            });
    };

    const fetchGrades = (studentId, assessmentId) => {
        setLoading(true);
        axios.get(`${ap}/grades`)
            .then(response => {
                const gradesData = response.data.filter(grade => grade.eleve_id._id === studentId && grade.evaluation_id._id === assessmentId);
                const detailedGrades = gradesData.map(grade => ({
                    ...grade,
                    courseName: grade.cours_id ? grade.cours_id.nom : 'Inconnu', // Handle unknown course names
                    note: grade.note !== undefined ? grade.note : 0,  // Set grade to 0 if missing
                }));
                setGrades(detailedGrades);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des notes :', error);
                setLoading(false);
            });
    };

    const generatePDF = async () => {
        const htmlContent = `
            <html>
                <body>
                    <h1>Bulletin de Notes</h1>
                    <h2>${getSelectedStudent().nom}</h2>
                    <table border="1" style="width: 100%; text-align: center;">
                        <thead>
                            <tr>
                                <th>Cours</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${grades.map(grade => `
                                <tr>
                                    <td>${grade.courseName}</td>
                                    <td>${grade.note}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                    <h3>Moyenne: ${calculateAverage()}</h3>
                </body>
            </html>
        `;
        try {
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            const fileName = `${getSelectedStudent().nom.replace(/\s+/g, '_')}.pdf`; // Replace spaces with underscores in file name
            const fileUri = FileSystem.documentDirectory + fileName;
            await FileSystem.moveAsync({
                from: uri,
                to: fileUri,
            });
            await Sharing.shareAsync(fileUri);
        } catch (error) {
            console.error('Erreur lors de la génération du PDF :', error);
            alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
        }
    };

    const getSelectedStudent = () => {
        return students.find(student => student._id === selectedStudent) || {};
    };

    const calculateAverage = () => {
        if (grades.length === 0) return 0;
        const total = grades.reduce((sum, grade) => sum + grade.note, 0);
        return (total / grades.length).toFixed(2);
    };

    const chart_wh = 250;
    const series = grades.map(grade => grade.note);

    // Generate consistent colors for courses
    const colorMapping = {};
    const getColor = (courseName) => {
        if (!colorMapping[courseName]) {
            colorMapping[courseName] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        }
        return colorMapping[courseName];
    };

    const sliceColor = grades.map(grade => getColor(grade.courseName));

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Bulletin de Notes</Text>
                </View>
                <Picker
                    selectedValue={selectedStudent}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setSelectedStudent(itemValue);
                        setSelectedAssessment(null);
                        setGrades([]);
                    }}>
                    <Picker.Item label="Sélectionner un élève" value={null} />
                    {students.map(student => (
                        <Picker.Item key={student._id} label={`${student.nom} (${student._id})`} value={student._id} />
                    ))}
                </Picker>
                {selectedStudent && (
                    <>
                        <Picker
                            selectedValue={selectedAssessment}
                            style={styles.picker}
                            onValueChange={(itemValue) => {
                                setSelectedAssessment(itemValue);
                                fetchGrades(selectedStudent, itemValue);
                            }}>
                            <Picker.Item label="Sélectionner un type d'évaluation" value={null} />
                            {assessments.map(assessment => (
                                <Picker.Item key={assessment._id} label={`${assessment.type} (${new Date(assessment.date).toLocaleDateString()})`} value={assessment._id} />
                            ))}
                        </Picker>
                        {grades.length > 0 ? (
                            <View style={styles.reportCard}>
                                <View style={styles.studentInfo}>
                                    <Text style={styles.studentText}>Nom: {getSelectedStudent().nom}</Text>
                                    <Text style={styles.studentText}>Niveau: {getSelectedStudent().niveau}</Text>
                                </View>
                                <FlatList
                                    data={grades}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => (
                                        <View style={[styles.card, { borderColor: getColor(item.courseName), borderWidth: 2 }]}>
                                            <Text style={styles.cardText}>Cours: {item.courseName}</Text>
                                            <Text style={styles.cardText}>Note: {item.note}</Text>
                                        </View>
                                    )}
                                    ListFooterComponent={() => (
                                        <View style={styles.footer}>
                                            <Text style={styles.footerText}>Moyenne: {calculateAverage()}</Text>
                                        </View>
                                    )}
                                    contentContainerStyle={styles.list}
                                />
                                <View style={styles.pieChartContainer}>
                                    <PieChart
                                        widthAndHeight={chart_wh}
                                        series={series}
                                        sliceColor={sliceColor}
                                        doughnut
                                        coverRadius={0.45}
                                        coverFill={'#FFF'}
                                    />
                                </View>
                            </View>
                        ) : (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>Aucune évaluation trouvée pour cet élève.</Text>
                            </View>
                        )}
                    </>
                )}
            </ScrollView>
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.downloadButton} onPress={generatePDF}>
                    <Text style={styles.downloadButtonText}>Télécharger PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('HOME')}>
                    <Ionicons name="home" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#007bff',
        paddingTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    studentInfo: {
        padding: 15,
        backgroundColor: '#e0e0e0',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    studentText: {
        fontSize: 18,
        marginBottom: 5,
    },
    reportCard: {
        flex: 1,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
    footer: {
        padding: 15,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 18,
        marginBottom: 10,
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#007bff',
    },
    downloadButton: {
        backgroundColor: '#00c851',
        padding: 15,
        borderRadius: 5,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    downloadButtonText: {
        color: 'white',
        fontSize: 16,
    },
    homeButton: {
        backgroundColor: '#009688',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pieChartContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    noDataContainer: {
        padding: 20,
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 18,
        color: 'gray',
    },
});
