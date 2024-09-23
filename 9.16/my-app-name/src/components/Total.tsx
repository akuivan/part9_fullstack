interface TotalProps {
    totalExercises: number;
}

const Total = (props: TotalProps) => {
    return <h4>Total exercises: {props.totalExercises}</h4>
};

export default Total;
