const React = require('react');

class Index extends React.Component {
    render() {
        const { lessons } = this.props;
        // console.log("in index")
        // console.log(lessons);
        return (
            <div>
                <nav>
                    <a href="/lessons/new">Create a New Lesson</a>
                </nav>
                <h1> Full List of Lessons </h1>
                <ul>
                    {lessons.map((lesson, i) => {
                        return (
                            <li key={lesson._id}>
                                The{' '}
                                <a href={`/lessons/${lesson._id}`}>
                                    {lesson.subject} lesson on {lesson.date.toDateString()}
                                </a>{' '}
                                is about {lesson.module ? lesson.module : '___'}: {lesson.topic ? lesson.topic : '____'}
                                <br />


                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

module.exports = Index;