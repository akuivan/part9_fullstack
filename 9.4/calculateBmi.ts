// calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

const calculateBmi = (heightCm: number , weightKg: number): string => {
    const heightM = heightCm / 100 ;
    const bmi = weightKg / (heightM * heightM);    

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return 'Normal range';
    } else if (bmi >= 25 && bmi < 29.9) {
        return 'Overweight';
    } else {
        return 'Obesity';
    }
}

const heightCm: number = Number(process.argv[2])
const weightKg: number = Number(process.argv[3])

console.log(calculateBmi(heightCm, weightKg))