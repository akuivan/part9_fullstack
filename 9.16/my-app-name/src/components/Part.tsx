import { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = (props: { part: CoursePart }) => {  
    switch(props.part.kind) { 
        case "basic":
            return (
                <div>
                  <h3>{props.part.name}, exercises:{props.part.exerciseCount}</h3>
                  <i>{props.part.description}</i>
                </div>
            );
        case "group":
            return (
                <div>
                  <h3>{props.part.name}, exercises:{props.part.exerciseCount}</h3>
                  <p>Group Projects: {props.part.groupProjectCount}</p>
                </div>
            );
        case "background":
            return (
                <div>
                  <h3>{props.part.name}, exercises:{props.part.exerciseCount}</h3>
                  <i>{props.part.description}</i>
                  <p>Background Material: {props.part.backgroundMaterial}</p>
                </div>
              );
        case "requirements":
              return (
                <div>
                  <h3>{props.part.name}, exercises:{props.part.exerciseCount}</h3>
                  <i>{props.part.description}</i>
                  <p>Required skills: {props.part.requirements.join(", ")}</p>
                </div>
              )

        default: 
            return assertNever(props.part);
    }
};

export default Part;