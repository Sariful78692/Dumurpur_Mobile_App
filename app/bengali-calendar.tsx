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

const weekDays = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'];
const todayText = 'আজ';

type BengaliDateParts = {
  day: number;
  month: string;
  year: number;
  weekday: string;
};

type CalendarCell = {
  bengaliDay: number;
  gregorianDay: number;
  gregorianMonth: string;
} | null;

const toBengaliNumber = (value: number) => String(value).replace(/\d/g, (digit) =>
  String.fromCharCode(0x09e6 + Number(digit)),
);

const bengaliMonths = ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'];
const bengaliWeekdays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];

const daysBetween = (from: Date, to: Date) => Math.round(
  (Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) - Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) / 86_400_000,
);

const getBengaliDateParts = (date: Date): BengaliDateParts => {
  const bengaliNewYear = new Date(date.getFullYear(), 3, 15, 12);
  const belongsToCurrentBengaliYear = date >= bengaliNewYear;
  const startDate = belongsToCurrentBengaliYear
    ? bengaliNewYear
    : new Date(date.getFullYear() - 1, 3, 15, 12);
  const bengaliYear = belongsToCurrentBengaliYear ? date.getFullYear() - 593 : date.getFullYear() - 594;
  const falgunDays = new Date(startDate.getFullYear() + 1, 1, 29).getMonth() === 1 ? 30 : 29;
  const monthLengths = [30, 31, 31, 31, 31, 30, 30, 30, 30, 30, falgunDays, 30];
  let remainingDays = daysBetween(startDate, date);
  let monthIndex = 0;

  while (remainingDays >= monthLengths[monthIndex] && monthIndex < bengaliMonths.length - 1) {
    remainingDays -= monthLengths[monthIndex];
    monthIndex += 1;
  }

  return {
    weekday: bengaliWeekdays[date.getDay()],
    day: remainingDays + 1,
    month: bengaliMonths[monthIndex],
    year: bengaliYear,
  };
};

const getBengaliMonthStart = (date: Date) => {
  const cursor = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  let bengaliParts = getBengaliDateParts(cursor);

  while (bengaliParts.day !== 1) {
    cursor.setDate(cursor.getDate() - 1);
    bengaliParts = getBengaliDateParts(cursor);
  }

  return cursor;
};

const buildBengaliCalendarRows = (date: Date): CalendarCell[][] => {
  const cursor = getBengaliMonthStart(date);
  const cells: CalendarCell[] = Array(cursor.getDay()).fill(null);

  for (let index = 0; index < 32; index += 1) {
    const parts = getBengaliDateParts(cursor);
    if (index > 0 && parts.day === 1) break;

    cells.push({
      bengaliDay: parts.day,
      gregorianDay: cursor.getDate(),
      gregorianMonth: cursor.toLocaleDateString('bn-BD', { month: 'short' }),
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return Array.from({ length: cells.length / 7 }, (_, index) => cells.slice(index * 7, index * 7 + 7));
};

const BengaliCalendar = () => {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);
  const [displayedDate, setDisplayedDate] = useState(today);
  const currentBengaliDate = useMemo(() => getBengaliDateParts(today), [today]);
  const displayedBengaliDate = useMemo(() => getBengaliDateParts(displayedDate), [displayedDate]);
  const calendarRows = useMemo(() => buildBengaliCalendarRows(displayedDate), [displayedDate]);
  const currentGregorianDate = useMemo(
    () => today.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
    [today],
  );
  const isCurrentBengaliMonth = displayedBengaliDate.month === currentBengaliDate.month
    && displayedBengaliDate.year === currentBengaliDate.year;
  const isFalgun = displayedBengaliDate.month === 'ফাল্গুন';

  const moveBengaliMonth = (direction: -1 | 1) => {
    const monthStart = getBengaliMonthStart(displayedDate);
    const nextDate = new Date(monthStart);
    nextDate.setDate(nextDate.getDate() + (direction === 1 ? 32 : -1));
    setDisplayedDate(getBengaliMonthStart(nextDate));
  };

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.backButtonText}>{'<- Back'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendarShell}>
          <View style={styles.headerBar}>
            <Text style={styles.screenTitle}>Bengali Calendar</Text>
            <View style={styles.monthNavigation}>
              <TouchableOpacity style={styles.navButton} onPress={() => moveBengaliMonth(-1)} activeOpacity={0.8}>
                <Text style={styles.navButtonText}>{'<'}</Text>
              </TouchableOpacity>
              <Text style={styles.monthTitle}>{displayedBengaliDate.month} {toBengaliNumber(displayedBengaliDate.year)}</Text>
              <TouchableOpacity style={styles.navButton} onPress={() => moveBengaliMonth(1)} activeOpacity={0.8}>
                <Text style={styles.navButtonText}>{'>'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.todayCard}>
            <Text style={styles.todayLabel}>{todayText}</Text>
            <Text style={styles.todayDate}>
              {currentBengaliDate.weekday}, {toBengaliNumber(currentBengaliDate.day)} {currentBengaliDate.month} {toBengaliNumber(currentBengaliDate.year)}
            </Text>
            <Text style={styles.gregorianDate}>{currentGregorianDate}</Text>
          </View>

          {isFalgun && (
            <View style={styles.ursBanner}>
              <Text style={styles.ursBannerText}>২২ ফাল্গুন — খাজা পিয়ার উরস মোবারক</Text>
            </View>
          )}

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
                const isToday = isCurrentBengaliMonth
                  && cell?.bengaliDay === currentBengaliDate.day
                  && cell.gregorianDay === today.getDate();
                const isUrsDay = isFalgun && cell?.bengaliDay === 22;
                return (
                  <View
                    key={`${rowIndex}-${index}`}
                    style={[styles.dateCell, index === 0 && styles.firstColumn, isToday && styles.todayCell, isUrsDay && styles.ursDayCell]}
                  >
                    {cell ? (
                      <>
                        <Text style={[styles.dateText, isToday && styles.todayDateText, isUrsDay && styles.ursDayText]}>{toBengaliNumber(cell.bengaliDay)}</Text>
                        <Text style={[styles.gregorianCellDate, isToday && styles.todayGregorianCellDate, isUrsDay && styles.ursDayText]}>
                          {toBengaliNumber(cell.gregorianDay)} {cell.gregorianMonth}
                        </Text>
                        {isUrsDay && <Text style={styles.ursCellLabel}>উরস</Text>}
                      </>
                    ) : null}
                  </View>
                );
              })}
            </View>
          ))}

          <View style={styles.legend}>
            <View style={styles.legendDot} />
            <Text style={styles.legendText}>Bengali date is shown first; highlighted date is today</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNav activeTab="home" />
    </ImageBackground>
  );
};

export default BengaliCalendar;

const styles = StyleSheet.create({
  backgroundImage: { flex: 1 },
  container: { padding: 16, paddingBottom: 90 },
  topBar: { marginBottom: 12 },
  backButton: { marginTop: 0, alignSelf: 'flex-start', backgroundColor: 'rgba(15, 86, 42, 0.95)', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 18, borderWidth: 1, borderColor: '#f9bf3a' },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  calendarShell: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', borderWidth: 2, borderColor: '#0f562a' },
  headerBar: { alignItems: 'center', backgroundColor: '#0f562a', paddingHorizontal: 12, paddingVertical: 16 },
  screenTitle: { color: '#f9bf3a', fontSize: 22, fontWeight: '800', marginBottom: 4 },
  monthNavigation: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  navButton: { width: 34, height: 30, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  navButtonText: { color: '#fff', fontSize: 24, fontWeight: '700', lineHeight: 28 },
  monthTitle: { color: '#fff', fontSize: 17, fontWeight: '700', textAlign: 'center', flex: 1 },
  todayCard: { backgroundColor: '#eef7f0', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#d2e5d6' },
  todayLabel: { color: '#0f562a', fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  todayDate: { color: '#17221a', fontSize: 16, fontWeight: '800', marginTop: 4, textAlign: 'center' },
  gregorianDate: { color: '#516156', fontSize: 13, fontWeight: '600', marginTop: 4 },
  ursBanner: { backgroundColor: '#7b1e1e', paddingHorizontal: 12, paddingVertical: 10, alignItems: 'center' },
  ursBannerText: { color: '#fff6d7', fontSize: 15, fontWeight: '800', textAlign: 'center' },
  weekRow: { flexDirection: 'row', backgroundColor: '#dfeee2', borderBottomWidth: 1, borderBottomColor: '#c7d9ca' },
  dayHeaderCell: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRightWidth: 1, borderRightColor: '#c7d9ca' },
  dayHeaderText: { color: '#1f4028', fontSize: 12, fontWeight: '800' },
  dateRow: { flexDirection: 'row', minHeight: 60, borderBottomWidth: 1, borderBottomColor: '#e3ebe4' },
  dateCell: { flex: 1, minHeight: 60, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#e3ebe4', backgroundColor: '#fff' },
  firstColumn: { backgroundColor: '#fbfdfb' },
  todayCell: { backgroundColor: '#f9bf3a', borderWidth: 2, borderColor: '#0f562a' },
  ursDayCell: { backgroundColor: '#7b1e1e', borderWidth: 2, borderColor: '#f9bf3a' },
  dateText: { color: '#1a1a1a', fontSize: 19, fontWeight: '800' },
  todayDateText: { color: '#0f562a', fontWeight: '900' },
  gregorianCellDate: { color: '#637068', fontSize: 9, fontWeight: '600', marginTop: 2 },
  todayGregorianCellDate: { color: '#0f562a' },
  ursDayText: { color: '#fff6d7' },
  ursCellLabel: { color: '#f9bf3a', fontSize: 9, fontWeight: '800', marginTop: 1 },
  legend: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, backgroundColor: '#f8fbf8' },
  legendDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#f9bf3a', borderWidth: 1, borderColor: '#0f562a' },
  legendText: { color: '#34523b', fontSize: 12, fontWeight: '600' },
});
