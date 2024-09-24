import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';
import { getAllDiaryEntries, createDiaryEntry } from './diaryService';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  // states for a new diary entry 
  const [newComment, setNewComment] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data);
    });
  }, []);

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiaryEntry: NewDiaryEntry = {
      date: newDate,
      weather: newWeather as any, 
      visibility: newVisibility as any, 
      comment: newComment,
    };

    createDiaryEntry(newDiaryEntry).then(data => {
      setDiaryEntries(diaryEntries.concat(data));
    });

    setNewComment('');
    setNewDate('');
    setNewWeather('');
    setNewVisibility('');
  };

  return (
    <div>
      <h2>Add a new entry</h2>
      <form onSubmit={diaryEntryCreation}>
        <div>
          <label>Date:</label>
          <input
            value={newDate}
            onChange={({ target }) => setNewDate(target.value)}
          />
        </div>
        <div>
          <label>Visibility:</label>
          <input
            value={newVisibility}
            onChange={({ target }) => setNewVisibility(target.value)}
          />
        </div>
        <div>
          <label>Weather:</label>
          <input
            value={newWeather}
            onChange={({ target }) => setNewWeather(target.value)}
          />
        </div>
        <div>
          <label>Comment:</label>
          <input
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>

      <h2>Diary entries</h2>
      {diaryEntries.map(diaryEntry => (
        <div key={diaryEntry.id}>
          <h4>{diaryEntry.date}</h4>
          <p>Comment: {diaryEntry.comment}</p>
          <p>Visibility: {diaryEntry.visibility}</p>
          <p>Weather: {diaryEntry.weather}</p>
        </div>
      ))}

    </div>
  );
};

export default App;
