const React = require('react')
class Show extends React.Component {
  render() {
    const lesson = this.props.lesson

    function showInput(inputs) {
      // console.log(inputs)
      return (
        <div>
          {inputs.map((input) => {
            return (
              <> {
              input.type === 'link'
                ?
                <a href={input.location}>{input.description} at {input.location}<br /></a>
                :
                <p>{input.description} {input.location ? `is at ${input.location}` : ''}</p>
              }
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

        {lesson.warmUp && lesson.warmUp.length > 0
          ?
          <div>
            <h3>Warm-Up</h3>
            {showInput(lesson.warmUp)}
          </div>
          :
          <div><h3>There is no Warm-Up Yet</h3></div>
        }

        {lesson.introduction && lesson.introduction.length > 0
          ?
          <div>
            <h3>Introduction</h3>
            {showInput(lesson.introduction)}
          </div>
          :
          <div><h3>There is no Introduction Yet</h3></div>
        }

        {lesson.presentation && lesson.presentation.length > 0
          ?
          <div>
            <h3>Presentation</h3>
            {showInput(lesson.presentation)}
          </div>
          :
          <div><h3>There is no Presentation Yet</h3></div>
        }

        {lesson.practice && lesson.practice.length > 0
          ?
          <div>
            <h3>Practice</h3>
            {showInput(lesson.practice)}
          </div>
          :
          <div><h3>There is no Practice Yet</h3></div>
        }

        {lesson.evaluation && lesson.evaluation.length > 0
          ?
          <div>
            <h3>Evaluation</h3>
            {showInput(lesson.evaluation)}
          </div>
          :
          <div><h3>There is no Evaluation Yet</h3></div>
        }

        {lesson.otherResources && lesson.otherResources.length > 0
          ?
          <div>
            <h3>Other Resources</h3>
            {showInput(lesson.otherResources)}
          </div>
          :
          <div><h3>There is no Other Resources Yet</h3></div>
        }

        <br />
        <form action={`/lessons/${lesson._id}?_method=DELETE`} method="POST">
            <input type="submit" value="DELETE" />
          </form>
        <a href={`/lessons/${lesson._id}/addInput`}>Add a new lesson input</a><br />
        <a href="/lessons">Back to Lessons List</a>
      </div>
    );
  }
}
module.exports = Show;