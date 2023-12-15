const React = require('react')
class NewInput extends React.Component {
  render() {
    const lesson = this.props.lesson

    function showInput(inputs, section) {
      // console.log(inputs)
      return (
        <div>

          {inputs.map((input) => {
            console.log(input)
            return (
              <> {
                input.type === 'link'
                  ?
                  <a href={input.location}>{input.description} at {input.location}</a>
                  :
                  <p>{input.description} {input.location ? ` __ is at __ ${input.location}` : ''}</p>
              }
                <form action={`/lessons/${lesson._id}/removeInput?_method=PUT`} method="POST">
                <input type="hidden" name="_id" value={input._id}/>
                <input type="hidden" name="section" value={section}/>
                  <input type="submit" value="DELETE" />
                </form>
                < br />
              </>
            )
          })}

        </div>
      )
    }

    return (
      <div>
        <h1> Show Page </h1>
        The {lesson.subject} lesson on {lesson.date.toDateString()} covers {lesson.module}: {lesson.topic}. <br />
        {lesson.standards ? <p>standards</p> : <p>No standards assigned</p>}

        <form action={`/lessons/${lesson._id}/addInput?_method=PUT`} method="POST">
          Type of Input:  {" "}
          <select name="inKey">
            <option value="warmUp">Warm-Up</option>
            <option value="introduction">Introduction</option>
            <option value="presentation">Presentation</option>
            <option value="practice">Practice</option>
            <option value="evaluation">Evaluation</option>
            <option value="otherResources">Other Resources</option>
          </select>
          <br />
          Description: <input type="text" name="description" /><br />
          Type (file or link): <select name="type" defaultValue={"link"}>
            <option value="link">link</option>
            <option value="file">file</option>
            <option value="noLoc">no location</option>
          </select>
          Location (url or physical):<input type="text" name="location" /><br />
          <input type="submit" value="Submit New Lesson Input" />
        </form>

        {lesson.warmUp && lesson.warmUp.length > 0
          ?
          <div>
            <h3>Warm-Up</h3>
            {showInput(lesson.warmUp, "warmUp")}
          </div>
          :
          <div><h3>There is no Warm-Up Yet</h3></div>
        }

        {lesson.introduction && lesson.introduction.length > 0
          ?
          <div>
            <h3>Introduction</h3>
            {showInput(lesson.introduction, "introduction")}
          </div>
          :
          <div><h3>There is no Introduction Yet</h3></div>
        }

        {lesson.presentation && lesson.presentation.length > 0
          ?
          <div>
            <h3>Presentation</h3>
            {showInput(lesson.presentation, "presentation")}
          </div>
          :
          <div><h3>There is no Presentation Yet</h3></div>
        }

        {lesson.practice && lesson.practice.length > 0
          ?
          <div>
            <h3>Practice</h3>
            {showInput(lesson.practice, "practice")}
          </div>
          :
          <div><h3>There is no Practice Yet</h3></div>
        }

        {lesson.evaluation && lesson.evaluation.length > 0
          ?
          <div>
            <h3>Evaluation</h3>
            {showInput(lesson.evaluation, "evaluation")}
          </div>
          :
          <div><h3>There is no Evaluation Yet</h3></div>
        }

        {lesson.otherResources && lesson.otherResources.length > 0
          ?
          <div>
            <h3>Other Resources</h3>
            {showInput(lesson.otherResources, "otherResources")}
          </div>
          :
          <div><h3>There is no Other Resources Yet</h3></div>
        }

        <br />
        <form action={`/lessons/${lesson._id}?_method=DELETE`} method="POST">
          <input type="submit" value="DELETE" />
        </form>
        <a href="/lessons">Back to Lessons List</a>
      </div>
    );
  }
}
module.exports = NewInput;