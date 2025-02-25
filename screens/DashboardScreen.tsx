import { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const DashboardScreen = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const querySnapshot = await getDocs(collection(db, 'exams'));
      const examsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExams(examsList);
    };
    fetchExams();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={exams}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text>{item.title} - {item.totalQuestions} Questions</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No exams available yet.</Text>}
      />
    </View>
  );
};

export default DashboardScreen;