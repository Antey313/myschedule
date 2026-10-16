import { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DAYS, type Lesson } from '../types';
import LessonCard from '../components/LessonCard';
import LessonForm from '../components/LessonForm';

interface ScheduleScreenProps {
  lessons: Lesson[];
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
}

export default function ScheduleScreen({
  lessons,
  onDelete,
  onToggleDone,
}: ScheduleScreenProps) {
  const [formVisible, setFormVisible] = useState(false);
  const [editing, setEditing] = useState<Lesson | null>(null);

  const today = new Date();
  const todayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;

  function handleAdd() {
    setEditing(null);
    setFormVisible(true);
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white border-b border-gray-100 px-4 py-4">
        <Text className="text-xl font-bold text-gray-900">Расписание</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {DAYS.map((day, index) => {
          const dayLessons = lessons.filter((l) => l.day === day.key);
          const isToday = index === todayIndex;
          return (
            <View key={day.key} className="mb-6">
              <Text
                className={`text-sm font-semibold uppercase tracking-wide mb-3 ${
                  isToday ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {day.label}
                {isToday && <Text className="text-xs"> (сегодня)</Text>}
              </Text>
              {dayLessons.length === 0 ? (
                <Text className="text-sm text-gray-400 italic">
                  Занятий нет
                </Text>
              ) : (
                dayLessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onDelete={onDelete}
                    onToggleDone={onToggleDone}
                  />
                ))
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* ДИАГНОСТИЧЕСКАЯ КНОПКА — красная, через style */}
      <Pressable
        onPress={handleAdd}
        style={{
          position: 'absolute',
          bottom: 40,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          elevation: 10,
        }}
      >
        <Text style={{ color: 'white', fontSize: 30, lineHeight: 30 }}>+</Text>
      </Pressable>

      <LessonForm
        visible={formVisible}
        editingLesson={editing}
        onClose={() => setFormVisible(false)}
      />
    </SafeAreaView>
  );
}
