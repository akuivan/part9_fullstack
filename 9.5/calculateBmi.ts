// calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

export const calculateBmi = (heightCm: number , weightKg: number): string => {
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

if (require.main === module) {
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);

    if (!isNaN(height) && !isNaN(weight)) {
        console.log(calculateBmi(height, weight));
    } else {
        console.log("malformatted parameters");
    }
}
