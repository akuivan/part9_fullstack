import express from 'express';
import { calculateBmi } from './calculateBmi';

const app = express();

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