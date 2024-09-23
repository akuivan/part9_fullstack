interface Part {
    name: string;
    exerciseCount: number;
}
  
interface ContentProps {
    courseParts: Part[];
}  

const Content = (props: ContentProps) => {
    return (
        <table>
          <thead>
            <tr>
              <th>Part</th>          
              <th>Exercises</th>    
            </tr>
          </thead>
          <tbody>
            {props.courseParts.map((part, index) => (
              <tr key={index}>
                <td>{part.name}</td>
                <td>{part.exerciseCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };
    
export default Content; 