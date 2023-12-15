const React = require('react');

class New extends React.Component {
  render() {
    const date = new Date();
    const today = date.getDate();
    const defaultDate = date.toLocaleDateString('en-US');
    return (
        <div>
            <h1>New Lesson page</h1>
            <form action="/lessons" method="POST">
                Date: <input type="datetime" name="date" defaultValue={defaultDate}/><br/>
                Subject: <select name="subject" defaultValue={'Math'}>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Social Studies">Social Studies</option>
                </select>
                Module: <input type="text" name="module" /><br/>
                Topic: <input type="text" name="topic" /><br/>

                <strong>Warm-Up: </strong><br />
                Description: <input type="text" name="wuDescription" /><br/>
                Type (file or link): <select name="wuType" defaultValue={"link"}>
                  <option value="link">link</option>                  
                  <option value="file">file</option>                  
                  <option value="noLoc">no location</option>
                </select>
                Location (url or physical):<input type="text" name="wuLocation" /><br/>

                <strong>Introduction: </strong><br />
                Description: <input type="text" name="inDescription" /><br/>
                Type (file or link): <select name="inType" defaultValue={"link"}>
                  <option value="link">link</option>                  
                  <option value="file">file</option>
                  <option value="noLoc">no location</option>
                </select>
                Location (url or physical):<input type="text" name="inLocation" /><br/>

                <strong>Presentation: </strong><br />
                Description: <input type="text" name="preDescription" /><br/>
                Type (file or link): <select name="preType" defaultValue={"link"}>
                  <option value="link">link</option>                  
                  <option value="file">file</option>
                  <option value="noLoc">no location</option>
                </select>
                Location (url or physical):<input type="text" name="preLocation" /><br/>

                <strong>Practice: </strong> <br />
                Description: <input type="text" name="praDescription" /><br/>
                Type (file or link): <select name="praType" defaultValue={"link"}>
                  <option value="link">link</option>                  
                  <option value="file">file</option>
                  <option value="noLoc">no location</option>
                </select>
                Location (url or physical):<input type="text" name="praLocation" /><br/>

                <strong>Evaluation: </strong><br />
                Description: <input type="text" name="evDescription" /><br/>
                Type (file or link): <select name="evType" defaultValue={"link"}>
                  <option value="link">link</option>                  
                  <option value="file">file</option>
                  <option value="noLoc">no location</option>
                </select>
                Location (url or physical):<input type="text" name="evLocation" /><br/>

                <strong>Other Resources: </strong><br />
                Description: <input type="text" name="otDescription" /><br/>
                Type (file or link): <select name="otType" defaultValue={"link"}>
                  <option value="link">link</option>                  
                  <option value="file">file</option>
                  <option value="noLoc">no location</option>
                </select>
                Location (url or physical):<input type="text" name="otLocation" /><br/>

                Standards: <input type="text" name="standards" /><br/>
                <input type="submit" name="" value="Create Lesson"/>
             </form>
        </div>);
  }
}

module.exports = New;

