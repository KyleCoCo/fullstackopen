
const Header = ({text}) => {
    return (<h2>
      {text}
    </h2>)
  }
  
  const Content = ({parts}) => {
    return parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)
  }
  
  const Part = ({name, exercises}) => {
    return (
    <div >
      {name} {exercises}
    </div>
    )
  }
  
  const Total = ({parts}) => {
    const _sum = parts.reduce((acc, num)=>acc+num.exercises, 0)
    return (
      <div>
        <b>total of {_sum} exercises</b>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
        <Header text={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
  }
  
  export default Course