require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
mongoose = require('mongoose');
const jsxViewEngine = require('jsx-view-engine');
const methodOverride = require('method-override');

const Lesson = require('./models/Lesson.js')
// const lessons = require('./models/lessons.js');


// DB connection
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => {
    console.log("connected to lessons db");
})

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

// ================ Middleware ================
//
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

app.use(methodOverride('_method'));

//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

// These are my routes
// We are going to create the 7 RESTful routes
// There is an order for them to listed in the code
// I - N - D - U - C - E - S
//  Action      HTTP Verb   CRUD 
// I - Index    GET         READ - display a list of elements
// N - New      GET         CREATE * - but this allows user input
// D - Delete   DELETE      DELETE
// U - Update   PUT         UPDATE * - this updates our database
// C - Create   POST        CREATE * - this adds to our database
// E - Edit     GET         UPDATE * - but this allows user input
// S - Show     GET         READ - display a specific element

// home route
app.get('/', (req, res) => {
    res.render('Home');
});

// Index of lessons
app.get('/lessons', async (req, res) => {
    try {
        const foundLessons = await Lesson.find({});
        // res.send(foundLessons);
        res.render('lessons/Index', { lessons: foundLessons });
        // res.send('updating for db')
    } catch (err) {
        res.status(400).send(err);
    }
});

// Add a New Lesson 
app.get('/lessons/new', (req, res) => {
    res.render('lessons/New');
})

// Delete a lesson from the db 
// This is permanent
app.delete('/lessons/:id', async (req, res) => {
    try {
        res.send("this functionality has been suspended, go back to <a href='/lessons'>lessons list</a>")
        // const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);
        // res.status(200).redirect('/lessons');
    } catch (err) {
        res.status(400).send(err);
    }
});

// UPDATE
app.put("/lessons/:id/addInput", async (req, res) => {
    console.log('in update');
    try {
        console.log('request body is')
        console.log(req.body)
        const newInput = [];
        const newFields = {};
        newFields.type = req.body.type;
        newFields.description = req.body.description;
        newFields.location = req.body.location;
        console.log('newFields is: ');
        console.log(newFields);

        console.log('need to push newFields to inKey')
        
        console.log('updates to make are: ');
        console.log('push ')
        console.log(newFields);
        console.log('on to ')
        console.log(req.body.inKey)
        const updatedLesson = await Lesson.findByIdAndUpdate(
            req.params.id, 
            { $push : {[req.body.inKey]: newFields } },
            {new: true},);
        console.log("lesson to update is: ");
        console.log(updatedLesson);
        res.redirect(`/lessons/${req.params.id}`);

    }
    catch (err) {
        res.status(400).send(err);
    }
})

// UPDATE
app.put("/lessons/:id/removeInput", async (req, res) => {
    console.log('in update remove input');
    try {
        // there is no body, need to get the lesson from db and remove input from array

        const lessonToUpdate = await Lesson.findById (req.params.id);
        console.log("lesson to update is: ");
        console.log(lessonToUpdate);
        console.log('request body is');
        console.log(req.body);

         const updatedLesson = await Lesson.findByIdAndUpdate(
              req.params.id, 
              { $pull : {[req.body.section]: {_id: req.body._id} } },
              {new: true},);
              console.log(updatedLesson)
        res.redirect(`/lessons/${req.params.id}`);

    }
    catch (err) {
        res.status(400).send(err);
    }
})
// UPDATE
app.put("/lessons/:id/changeInput", async (req, res) => {
    console.log('in update change input');
    try {
        console.log('request body is')
        console.log(req.body)
        // const newInput = [];
        // const newFields = {};
        // newFields.type = req.body.type;
        // newFields.description = req.body.description;
        // newFields.location = req.body.location;
        // console.log('newFields is: ');
        // console.log(newFields);

        // console.log('need to push newFields to inKey')
        
        // console.log('updates to make are: ');
        // console.log('push ')
        // console.log(newFields);
        // console.log('on to ')
        // console.log(req.body.inKey)
        // const updatedLesson = await Lesson.findByIdAndUpdate(
        //     req.params.id, 
        //     { $push : {[req.body.inKey]: newFields } },
        //     {new: true},);
        // console.log("lesson to update is: ");
        // console.log(updatedLesson);
        res.redirect(`/lessons/${req.params.id}`);

    }
    catch (err) {
        res.status(400).send(err);
    }
})

// Create the new lesson
app.post('/lessons', async (req, res) => {
    // Check that the form inputs are passed in as expected
    // console.log(req.body)
    // change the text inputs to attributes of the parts of the lesson
    // Warm-Up
    // warmUp: { description: '', type: '', fileOrUrl: ''},
    // if (!req.body.warmUp) req.body.warmUp = { description: 'TBD', type: 'link', location: 'TBD'};
    if (req.body.wuDescription || req.body.wuLocation) {
        const warmUp = { description: 'TBD', type: 'link', location: 'TBD' };
        if (req.body.wuDescription) warmUp.description = req.body.wuDescription;
        delete req.body.wuDescription;
        if (req.body.wuType) warmUp.type = req.body.wuType;
        delete req.body.wuType;
        if (req.body.wuLocation) warmUp.location = req.body.wuLocation;
        delete req.body.wuLocation
        req.body.warmUp = []
        req.body.warmUp.push(warmUp);
    }
    // Introduction
    // introduction: { description: '', type: '', fileOrUrl: ''},
    // if (!req.body.introduction) req.body.introduction = { description: 'TBD', type: 'link', location: 'TBD'};
    if (req.body.inDescription || req.body.inLocation) {
        const introduction = { description: 'TBD', type: 'link', location: 'TBD' };
        if (req.body.inDescription) introduction.description = req.body.inDescription;
        delete req.body.inDescription;
        if (req.body.inType) introduction.type = req.body.inType;
        delete req.body.inType;
        if (req.body.inLocation) introduction.location = req.body.inLocation;
        delete req.body.inLocation;
        req.body.introduction = [];
        req.body.introduction.push(introduction);
    }
    // Presentation
    // presentation: { description: '', type: '', fileOrUrl: ''},
    // if (!req.body.presentation) req.body.presentation = { description: 'TBD', type: 'link', location: 'TBD'};
    if (req.body.preDescription || req.body.preLocation) {
        const presentation = { description: 'TBD', type: 'link', location: 'TBD' };
        if (req.body.preDescription) presentation.description = req.body.preDescription;
        delete req.body.preDescription;
        if (req.body.preType) presentation.type = req.body.preType;
        delete req.body.preType;
        if (req.body.preLocation) presentation.location = req.body.preLocation;
        delete req.body.preLocation;
        req.body.presentation = [];
        req.body.presentation.push(presentation);
    }
    // Practice
    // practice: { description: '', type: '', fileOrUrl: ''},
    // if (!req.body.practice) req.body.practice = { description: 'TBD', type: 'link', location: 'TBD'};
    if (req.body.praDescription || req.body.praLocation) {
        const practice = { description: 'TBD', type: 'link', location: 'TBD' };
        if (req.body.praDescription) practice.description = req.body.praDescription;
        delete req.body.praDescription;
        if (req.body.praType) practice.type = req.body.praType;
        delete req.body.praType;
        if (req.body.praLocation) practice.location = req.body.praLocation;
        delete req.body.praLocation;
        req.body.practice = [];
        req.body.practice.push(practice);
    }

    // Evaluation
    // evaluation: { description: '', type: '', fileOrUrl: ''},
    // if (!req.body.evaluation) req.body.evaluation = { description: 'TBD', type: 'link', location: 'TBD'};
    if (req.body.evDescription || req.body.evLocation) {
        const evaluation = { description: 'TBD', type: 'link', location: 'TBD' };
        if (req.body.evDescription) evaluation.description = req.body.evDescription;
        delete req.body.evDescription;
        if (req.body.evType) evaluation.type = req.body.evType;
        delete req.body.evType;
        if (req.body.evLocation) evaluation.location = req.body.evLocation;
        delete req.body.evLocation;
        req.body.evaluation = [];
        req.body.evaluation.push(evaluation);
    }

    // Other Resources
    // otherResources: { description: '', type: '', fileOrUrl: ''},
    if (req.body.otDescription || req.body.otLocation) {
        const otherResources = { description: 'TBD', type: 'link', location: 'TBD' };
        // if (!req.body.otherResources) req.body.otherResources = { description: 'TBD', type: 'link', location: 'TBD'};
        if (req.body.otDescription) otherResources.description = req.body.otDescription;
        if (req.body.otType) otherResources.type = req.body.otType;
        if (req.body.otLocation) otherResources.location = req.body.otLocation;
        req.body.otherResources = [];
        req.body.otherResources.push(otherResources);
    }
    delete req.body.otDescription;
    delete req.body.otType;
    delete req.body.otLocation

    // Check that the inputs are converted as expected
    // console.log(req.body)
    // lessons.push(req.body);
    // res.send(req.body);
    // res.send('creating a new lesson');
    try {
        const createdLesson = await Lesson.create(req.body);
        res.status(200).redirect('/lessons');
    } catch (err) {
        res.status(400).send(err);
    }
    
})

// Edit - show the form for user inputs to edit the lesson
// instead of creating a new page, add a form to the show page, so that we can update 
app.get('/lessons/:id/addInput', async (req, res)=>{
     try {
         const foundLesson = await Lesson.findById(req.params.id);
         res.status(200).render('lessons/NewInput', {lesson: foundLesson});
     } catch (err) {
         res.status(400).send(err);
     }
    
});

// Show an individual Lesson
app.get('/lessons/:id', async (req, res) => {
    try {
        // console.log(req.params.id);
        const foundLesson = await Lesson.findById(req.params.id);
        res.render('lessons/Show', { lesson: foundLesson });
    } catch (err) {
        res.status(400).send(err);
    }
    // if (lessons[req.params.indexOfLessonsArray]) {
    //     res.render('lessons/Show', {
    //         lesson: lessons[req.params.indexOfLessonsArray]
    //     });
    // } else {
    //     res.send(`<h3>No lessons match</h3><a href="/lessons">return to lesson list</a><br /><a href="/">return to home</a>`);
    // }
    // res.send('updating to include db');
});

// Default route - redirects to Home
app.get("*", (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log('listening');
});