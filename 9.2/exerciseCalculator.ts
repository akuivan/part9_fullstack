// For the Result object, you should create an interface.
interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }

// Write a function calculateExercises that calculates the average time of daily exercise hours, compares it to the target amount of daily hours and returns an object.
const calculateExercises = (dailyHours: number[], target: number): Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(day => day > 0).length;
    const totalHours = dailyHours.reduce((acc, cur) => acc + cur, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
  
    let rating: number;
    let ratingDescription: string;
  
    if (average >= target) {
      rating = 3;
      ratingDescription = 'Good job! You reached the Target.';
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
      average
    };
  }

  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));