import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/store';
import { useAppDispatch } from '../../redux/config/reduxHook';
import { fetchMonthRecords } from '../../redux/actions/carbonAction';
import { CarbonRecord } from '../../redux/reducers/carbonSlice';

/* ───────────── 달력 한 칸 컴포넌트 ───────────── */
const CELL = 46;
interface CellProps {
  day: number;
  plus: number;
  minus: number;
  selected: boolean;
  onSelect: (d: number) => void;
}
const DayCell: React.FC<CellProps> = ({
  day,
  plus,
  minus,
  selected,
  onSelect,
}) => (
  <TouchableOpacity
    style={[styles.cell, selected && styles.cellSelected]}
    onPress={() => onSelect(day)}
  >
    <Text style={styles.cellDay}>{day}</Text>
    {plus > 0 && <Text style={styles.plusText}>{`+${plus / 1000}`}</Text>}
    {minus < 0 && <Text style={styles.minusText}>{`${minus / 1000}`}</Text>}
  </TouchableOpacity>
);

/* ───────────── 메인 스크린 ───────────── */
const ThirdScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { monthRecords, loading } = useSelector((s: RootState) => s.carbon);

  /* 현재 연·월 state */
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1); // 1~12
  const [selectedDay, setSelectedDay] = useState<number>(today.getDate());

  /* ─ fetch when year/month changes ─ */
  useEffect(() => {
    dispatch(fetchMonthRecords(String(year), String(month).padStart(2, '0')));
    // 선택된 날짜를 1일로 리셋 (월 넘어갈 때 index 에러 방지)
    setSelectedDay(1);
  }, [year, month]);

  /* 달 변경 핸들러 */
  const changeMonth = useCallback(
    (dir: 'prev' | 'next') => {
      setMonth((prev) => {
        const newMonth = dir === 'prev' ? prev - 1 : prev + 1;
        if (newMonth === 0) {
          setYear((y) => y - 1);
          return 12;
        }
        if (newMonth === 13) {
          setYear((y) => y + 1);
          return 1;
        }
        return newMonth;
      });
    },
    [],
  );

  /* 해당 월의 일 수 */
  const daysInMonth = new Date(year, month, 0).getDate(); // 28~31

  /* 날짜별 집계 데이터 */
  const calendarData = useMemo(() => {
    const base = Array.from({ length: daysInMonth }, (_, idx) => ({
      day: idx + 1,
      plus: 0,
      minus: 0,
      records: [] as CarbonRecord[],
    }));
    monthRecords.forEach((r) => {
      const d = new Date(r.date).getDate() - 1;
      if (d >= 0 && d < daysInMonth) {
        if (r.amount > 0) base[d].plus += r.amount;
        if (r.amount < 0) base[d].minus += r.amount;
        base[d].records.push(r);
      }
    });
    return base;
  }, [monthRecords, daysInMonth]);

  const totalMonth = useMemo(
    () => monthRecords.reduce((sum, r) => sum + r.amount, 0),
    [monthRecords],
  );

  const selectedData =
    calendarData.find((c) => c.day === selectedDay) ?? calendarData[0];

  /* ───────────── UI ───────────── */
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 월 네비게이터 */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => changeMonth('prev')}>
          <Ionicons name="chevron-back" size={22} color="#2B2B2B" />
        </TouchableOpacity>
        <Text style={styles.headerMonth}>
          {year}년 {month}월
        </Text>
        <TouchableOpacity onPress={() => changeMonth('next')}>
          <Ionicons name="chevron-forward" size={22} color="#2B2B2B" />
        </TouchableOpacity>
      </View>

      <Text style={styles.totalText}>
        {(totalMonth / 1000).toLocaleString()} kg
      </Text>
      <Text style={styles.totalSub}>이달의 탄소 절감 · 증가 합계</Text>

      {loading && (
        <ActivityIndicator
          size="small"
          color="#3384FF"
          style={{ marginVertical: 8 }}
        />
      )}

      {/* 달력 */}
      <View style={styles.calendarGrid}>
        {['일', '월', '화', '수', '목', '금', '토'].map((w) => (
          <Text key={w} style={styles.weekday}>
            {w}
          </Text>
        ))}
        {calendarData.map(({ day, plus, minus }) => (
          <DayCell
            key={day}
            day={day}
            plus={plus}
            minus={minus}
            selected={day === selectedDay}
            onSelect={setSelectedDay}
          />
        ))}
      </View>

      {/* 세부 내역 */}
      <Text style={styles.recordHeader}>{`${month}월 ${selectedDay}일 기록`}</Text>
      <FlatList
        data={selectedData?.records ?? []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text style={styles.recordAmount}>
              {(item.amount / 1000).toFixed(2)} kg
            </Text>
            <Text style={styles.recordDesc}>{item.desc}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noData}>기록이 없습니다.</Text>}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </SafeAreaView>
  );
};

export default ThirdScreen;

/* ───────────── Styles ───────────── */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingTop: 8,
  },
  headerMonth: { fontSize: 20, fontWeight: 'bold' },

  totalText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
  totalSub: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
  },

  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 8,
  },
  weekday: {
    width: CELL,
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 4,
    color: '#888',
  },
  cell: { width: CELL, height: 60, alignItems: 'center', marginVertical: 2 },
  cellSelected: { backgroundColor: '#E0F0FF', borderRadius: 8 },
  cellDay: { fontWeight: '600', color: '#2B2B2B', marginBottom: 2 },
  plusText: { fontSize: 10, color: '#1E8BFF' },
  minusText: { fontSize: 10, color: '#FF6464' },

  recordHeader: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 14,
    fontWeight: '600',
  },
  recordItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  recordAmount: { fontSize: 16, fontWeight: '700', color: '#2B2B2B' },
  recordDesc: { fontSize: 12, color: '#666' },
  noData: { textAlign: 'center', color: '#999', padding: 20 },
});
