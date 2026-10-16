import { View, Text, Pressable } from 'react-native';
import type { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
}

export default function LessonCard({
  lesson,
  onDelete,
  onToggleDone,
}: LessonCardProps) {
  return (
    <View className="bg-white rounded-xl p-4 mb-3 border border-gray-100">
      <View className="flex-row justify-between items-start mb-1">
        <Text className="text-base font-semibold text-gray-900 flex-1">
          {lesson.subject}
        </Text>
        <Text className="text-xs text-gray-500">
          {lesson.startTime}–{lesson.endTime}
        </Text>
      </View>
      {!!lesson.teacher && (
        <Text className="text-sm text-gray-500">{lesson.teacher}</Text>
      )}
      {!!lesson.room && (
        <Text className="text-sm text-gray-500">Ауд. {lesson.room}</Text>
      )}
      {!!lesson.task && (
        <Text className="text-sm text-gray-700 mt-2">{lesson.task}</Text>
      )}
      <View className="flex-row gap-2 mt-3">
        <Pressable
          onPress={() => onToggleDone(lesson.id)}
          className={`px-3 py-1 rounded ${
            lesson.taskDone ? 'bg-green-100' : 'bg-gray-100'
          }`}
        >
          <Text className="text-xs text-gray-700">
            {lesson.taskDone ? 'Выполнено' : 'Отметить'}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onDelete(lesson.id)}
          className="px-3 py-1 rounded bg-red-50"
        >
          <Text className="text-xs text-red-600">Удалить</Text>
        </Pressable>
      </View>
    </View>
  );
}
