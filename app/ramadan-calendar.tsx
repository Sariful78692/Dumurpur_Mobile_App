import React, { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomNav from '../components/BottomNav';

const backgroundImage = {
  uri: 'https://t4.ftcdn.net/jpg/04/24/19/47/360_F_424194700_YLn8PuaiqR36LI84T9E76ATDd6HrU2at.jpg',
};

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type IslamicDateParts = {
  day: number;
  month: string;
  year: number;
  weekday: string;
};

type CalendarCell = {
  islamicDay: number;
  gregorianDay: number;
  gregorianMonth: string;
} | null;

const getIslamicDateParts = (date: Date): IslamicDateParts => {
  // Keep the app aligned with the locally observed moon date used by the Dorbar:
  // the runtime Intl calendar is currently two days ahead.
  const locallyObservedDate = new Date(date);
  locallyObservedDate.setDate(locallyObservedDate.getDate() - 2);
  const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const parts = formatter.formatToParts(locallyObservedDate);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '';

  return {
    weekday: value('weekday'),
    day: Number(value('day')),
    month: value('month'),
    year: Number(value('year')),
  };
};

const getIslamicMonthStart = (date: Date) => {
  const cursor = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  let islamicParts = getIslamicDateParts(cursor);

  while (islamicParts.day !== 1) {
    cursor.setDate(cursor.getDate() - 1);
    islamicParts = getIslamicDateParts(cursor);
  }

  return cursor;
};

const buildIslamicCalendarRows = (date: Date): CalendarCell[][] => {
  const cursor = getIslamicMonthStart(date);
const cells: CalendarCell[] = Array(cursor.getDay()).fill(null);

  for (let index = 0; index < 31; index += 1) {
    const parts = getIslamicDateParts(cursor);
    if (index > 0 && parts.day === 1) break;

    cells.push({
      islamicDay: parts.day,
      gregorianDay: cursor.getDate(),
      gregorianMonth: cursor.toLocaleDateString('en-US', { month: 'short' }),
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return Array.from({ length: cells.length / 7 }, (_, index) => cells.slice(index * 7, index * 7 + 7));
};

const IslamicCalendar = () => {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);
  const [displayedDate, setDisplayedDate] = useState(today);
  const currentIslamicDate = useMemo(() => getIslamicDateParts(today), [today]);
  const displayedIslamicDate = useMemo(() => getIslamicDateParts(displayedDate), [displayedDate]);
  const calendarRows = useMemo(() => buildIslamicCalendarRows(displayedDate), [displayedDate]);
  const currentGregorianDate = useMemo(
    () => today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    [today],
  );
  const isCurrentIslamicMonth = displayedIslamicDate.month === currentIslamicDate.month
    && displayedIslamicDate.year === currentIslamicDate.year;

  const moveIslamicMonth = (direction: -1 | 1) => {
    const monthStart = getIslamicMonthStart(displayedDate);
    const nextDate = new Date(monthStart);
    nextDate.setDate(nextDate.getDate() + (direction === 1 ? 32 : -1));
    setDisplayedDate(getIslamicMonthStart(nextDate));
  };

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendarShell}>
          <View style={styles.headerBar}>
            <Text style={styles.screenTitle}>Islamic Calendar</Text>
            <View style={styles.monthNavigation}>
              <TouchableOpacity style={styles.navButton} onPress={() => moveIslamicMonth(-1)} activeOpacity={0.8}>
                <Text style={styles.navButtonText}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.monthTitle}>{displayedIslamicDate.month} {displayedIslamicDate.year} AH</Text>
              <TouchableOpacity style={styles.navButton} onPress={() => moveIslamicMonth(1)} activeOpacity={0.8}>
                <Text style={styles.navButtonText}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.todayCard}>
            <Text style={styles.todayLabel}>Today</Text>
            <Text style={styles.todayDate}>
              {currentIslamicDate.weekday}, {currentIslamicDate.day} {currentIslamicDate.month} {currentIslamicDate.year} AH
            </Text>
            <Text style={styles.gregorianDate}>{currentGregorianDate}</Text>
          </View>

          <View style={styles.weekRow}>
            {weekDays.map((day) => (
              <View key={day} style={styles.dayHeaderCell}>
                <Text style={styles.dayHeaderText}>{day}</Text>
              </View>
            ))}
          </View>

          {calendarRows.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.dateRow}>
              {row.map((cell, index) => {
                const isToday = isCurrentIslamicMonth
                  && cell?.islamicDay === currentIslamicDate.day
                  && cell.gregorianDay === today.getDate();
                return (
                  <View
                    key={`${rowIndex}-${index}`}
                    style={[styles.dateCell, index === 0 && styles.firstColumn, isToday && styles.todayCell]}
                  >
                    {cell ? (
                      <>
                        <Text style={[styles.dateText, isToday && styles.todayDateText]}>{cell.islamicDay}</Text>
                        <Text style={[styles.gregorianCellDate, isToday && styles.todayGregorianCellDate]}>
                          {cell.gregorianDay} {cell.gregorianMonth}
                        </Text>
                      </>
                    ) : null}
                  </View>
                );
              })}
            </View>
          ))}

          <View style={styles.legend}>
            <View style={styles.legendDot} />
            <Text style={styles.legendText}>Hijri date is shown first; highlighted date is today</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNav activeTab="home" />
    </ImageBackground>
  );
};

export default IslamicCalendar;

const styles = StyleSheet.create({
  backgroundImage: { flex: 1 },
  container: { padding: 16, paddingBottom: 90 },
  topBar: { marginBottom: 12 },
  backButton: { alignSelf: 'flex-start', backgroundColor: 'rgba(15, 86, 42, 0.95)', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#f9bf3a' },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  calendarShell: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', borderWidth: 2, borderColor: '#0f562a' },
  headerBar: { alignItems: 'center', backgroundColor: '#0f562a', paddingHorizontal: 12, paddingVertical: 16 },
  screenTitle: { color: '#f9bf3a', fontSize: 22, fontWeight: '800', marginBottom: 4 },
  monthNavigation: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  navButton: { width: 34, height: 30, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  navButtonText: { color: '#fff', fontSize: 26, fontWeight: '700', lineHeight: 28 },
  monthTitle: { color: '#fff', fontSize: 17, fontWeight: '700', textAlign: 'center', flex: 1 },
  todayCard: { backgroundColor: '#eef7f0', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#d2e5d6' },
  todayLabel: { color: '#0f562a', fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  todayDate: { color: '#17221a', fontSize: 16, fontWeight: '800', marginTop: 4, textAlign: 'center' },
  gregorianDate: { color: '#516156', fontSize: 13, fontWeight: '600', marginTop: 4 },
  weekRow: { flexDirection: 'row', backgroundColor: '#dfeee2', borderBottomWidth: 1, borderBottomColor: '#c7d9ca' },
  dayHeaderCell: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRightWidth: 1, borderRightColor: '#c7d9ca' },
  dayHeaderText: { color: '#1f4028', fontSize: 12, fontWeight: '800' },
  dateRow: { flexDirection: 'row', minHeight: 60, borderBottomWidth: 1, borderBottomColor: '#e3ebe4' },
  dateCell: { flex: 1, minHeight: 60, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#e3ebe4', backgroundColor: '#fff' },
  firstColumn: { backgroundColor: '#fbfdfb' },
  todayCell: { backgroundColor: '#f9bf3a', borderWidth: 2, borderColor: '#0f562a' },
  dateText: { color: '#1a1a1a', fontSize: 19, fontWeight: '800' },
  todayDateText: { color: '#0f562a', fontWeight: '900' },
  gregorianCellDate: { color: '#637068', fontSize: 9, fontWeight: '600', marginTop: 2 },
  todayGregorianCellDate: { color: '#0f562a' },
  legend: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, backgroundColor: '#f8fbf8' },
  legendDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#f9bf3a', borderWidth: 1, borderColor: '#0f562a' },
  legendText: { color: '#34523b', fontSize: 12, fontWeight: '600' },
});
