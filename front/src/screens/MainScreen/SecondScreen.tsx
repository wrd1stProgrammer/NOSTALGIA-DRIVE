import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { navigate } from '../../navigation/NavigationUtils';
import { useAppDispatch } from '../../redux/config/reduxHook';
const { width } = Dimensions.get('window');
const ITEM_HEIGHT = 80;

type Game = {
  id: string;
  date: string;
  home: string;
  away: string;
  time: string;
};

const games: Game[] = [
  { id: '1', date: '5/20 (화)', home: '두산 베어스', away: 'NC 다이노스', time: '18:30' },
  { id: '2', date: '5/21 (수)', home: 'LG 트윈스', away: '키움 히어로즈', time: '18:30' },
  { id: '3', date: '5/22 (목)', home: 'KT 위즈', away: '삼성 라이온즈', time: '18:30' },
  { id: '4', date: '5/23 (금)', home: 'KIA 타이거즈', away: '롯데 자이언츠', time: '18:30' },
  { id: '5', date: '5/24 (토)', home: 'SSG 랜더스', away: '한화 이글스', time: '14:00' },
];

const ScheduleItem: React.FC<{ game: Game }> = ({ game }) => (

  <TouchableOpacity
    style={styles.itemContainer}
  >
    <View style={styles.dateBox}>
      <Text style={styles.dateText}>{game.date}</Text>
    </View>
    <View style={styles.teamsBox}>
      <Text style={styles.teamText}>{game.away}</Text>
      <Text style={styles.vsText}>vs</Text>
      <Text style={styles.teamText}>{game.home}</Text>
    </View>
    <View style={styles.timeBox}>
      <Text style={styles.timeText}>{game.time}</Text>
    </View>
  </TouchableOpacity>
);

const SecondScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ScheduleItem game={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F6FD',
  },
  listContainer: {
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ITEM_HEIGHT,
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    paddingHorizontal: 12,
  },
  dateBox: {
    width: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
  teamsBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  vsText: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 4,
  },
  timeBox: {
    width: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#555',
  },
});
