import express from 'express';
import { calculateBmi } from './calculateBmi';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target }: { daily_exercises: any; target: any } = req.body;

  if (daily_exercises === undefined || target === undefined) {
      return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
      return res.status(400).json({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyHours = daily_exercises.map((value: any) => {
      const num = Number(value);
      if (isNaN(num)) throw new Error('Daily exercise hours must be numbers.');
      return num;
  });

  try {
      const result = calculateExercises(dailyHours, Number(target));
      return res.json(result);
  } catch (error: unknown) {
      let errorMessage = 'Something bad happened.';
      if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
      }
      return res.status(500).json({ error: errorMessage });
  }
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!req.query.height || !req.query.weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi
  });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
