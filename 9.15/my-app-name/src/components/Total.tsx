interface TotalProps {
    totalExercises: number;
}

const Total = (props: TotalProps) => {
    return <p>Total exercises: {props.totalExercises}</p>
};

export default Total;
