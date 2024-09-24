import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaryEntries } from './diaryService';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data);
    });
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      {diaryEntries.map(diaryEntry => (
        <>
          <h4>{diaryEntry.date}</h4>
          <p>comment: {diaryEntry.comment}</p>
          <p>visibility: {diaryEntry.visibility}</p>
          <p>weather: {diaryEntry.weather}</p>
        </>
      ))}
    </div>
  );
};

export default App;
