interface ExerciseValues {
  target: number;
  dailyHours: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 3) throw new Error('Not enough arguments. Provide a target value followed by daily exercise hours.');
  
  const target = parseFloat(args[2]);
  if (isNaN(target)) throw new Error('Target value must be a number.');
  
  const dailyHours = args.slice(3).map(arg => {
    const num = parseFloat(arg);
    if (isNaN(num)) throw new Error('Daily exercise hours must be numbers.');
    return num;
  });
  
  return { target, dailyHours };
};

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(day => day > 0).length;
  const totalHours = dailyHours.reduce((acc, cur) => acc + cur, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Excellent job! You reached your target.';
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better.';
  } else {
    rating = 1;
    ratingDescription = 'You need to work harder to reach your goal.';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};


if (require.main === module) {
  try {
    const { target, dailyHours } = parseArguments(process.argv);
    const result = calculateExercises(dailyHours, target);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
};


