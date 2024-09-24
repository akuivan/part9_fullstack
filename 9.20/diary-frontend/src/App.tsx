import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';
import { getAllDiaryEntries, createDiaryEntry } from './diaryService';
import axios from "axios";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  // states for a new diary entry 
  const [newComment, setNewComment] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState<Weather | ''>('');
  const [newVisibility, setNewVisibility] = useState<Visibility | ''>('');
  //state for possible error 
  const [errorMessage, setErrorMessage]= useState('');

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data);
    });
  }, []);

  const diaryEntryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiaryEntry: NewDiaryEntry = {
      date: newDate,
      weather: newWeather as Weather, 
      visibility: newVisibility as Visibility, 
      comment: newComment,
    };

    try {
      const data = await createDiaryEntry(newDiaryEntry);
      setDiaryEntries(diaryEntries.concat(data));
      
      setNewComment('');
      setNewDate('');
      setNewWeather('');
      setNewVisibility('');  
      setErrorMessage('');
    } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data);
        } else {
          console.error(error);
        }
    };
  };

  return (
    <div>
      <h2>Add a new entry</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={diaryEntryCreation}>
        <div>
          <label>Date:</label>
          <input
            type= "date"
            value={newDate}
            onChange={({ target }) => setNewDate(target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>Visibility:</label>
          {Object.values(Visibility).map((visibility) => (
            <div key={visibility}>
              <input
                type="radio"
                id={visibility}
                name="visibility"
                value={visibility}
                checked={newVisibility === visibility}
                onChange={({ target }) => setNewVisibility(target.value as Visibility)}
              />
              <label htmlFor={visibility}>{visibility}</label>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>Weather:</label>
          {Object.values(Weather).map((weather) => (
            <div key={weather}>
              <input
                type="radio"
                id={weather}
                name="weather"
                value={weather}
                checked={newWeather === weather}
                onChange={({ target }) => setNewWeather(target.value as Weather)}
              />
              <label htmlFor={weather}>{weather}</label>
            </div>
          ))}
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
