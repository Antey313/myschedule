import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { addLesson } from './store/lessonsSlice';
import { getAllLessons, saveLesson } from './database';

export function AppContent() {
  const lessons = useAppSelector(state => state.lessons.items);
  const dispatch = useAppDispatch();

  // Загрузка из БД при старте
  useEffect(() => {
    getAllLessons().then(saved => {
      saved.forEach(l => dispatch(addLesson(l)));
    });
  }, []);

  // Сохранение при каждом изменении
  useEffect(() => {
    if (lessons.length > 0) {
      lessons.forEach(l => saveLesson(l));
    }
  }, [lessons]);

  return null;
}
