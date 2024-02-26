const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //imports the middleware to access REST requests
const PORT = process.env.PORT || 3001;
const { sequelize, connectToDB } = require('./db');
const { syncModels } = require('./models')
const { Issue } = require('./models'); // Import the Issue model

app.get('/', (req, res) => {
    res.send('post backend is running!');
});


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToDB();
    await syncModels();
});

const router = express.Router();

// Create a route to test the connection
app.get('/', (req, res) => {
    res.send('MySQL connection established!');
});

app.use(bodyParser.json()); //basically allows middleware to access and parse REST requests

app.get('/issues', async (req, res) => {  //REST API endpoint to get all the rows in issuePosts
    try {
        const issues = await Issue.findAll();  //integrated sequelize function, no need to add own boilerplate
        console.log("stuff has been fetched\n");
        res.json(issues);
    } catch (error) {
        console.error('Error retrieving issues:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/issues', async (req, res) => {  //REST API endpoint to update table to add new entry (issue)
    try {
        // Extract data from the request body
        const { customerId, description, title, image_link, category, address, startDate, endDate } = req.body;

        // Create a new issue record in the database
        const newIssue = await Issue.create({
            customerId,
            description,
            title,
            image_link,
            category,
            address,
            startDate,
            endDate
        });

        // Respond with the newly created issue
        res.status(201).json(newIssue);
    } catch (error) {
        console.error('Error adding new issue:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Retrieve Issue by ID
app.get('/issues/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.findByPk(id);
        if (issue) {
            res.json(issue);
        } else {
            res.status(404).json({ error: 'Issue not found' });
        }
    } catch (error) {
        console.error('Error retrieving issue:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/issues/date-range', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const issues = await Issue.findAll({
            where: {
                startDate: { [Op.gte]: startDate },
                endDate: { [Op.lte]: endDate }
            }
        });
        res.json(issues);
    } catch (error) {
        console.error('Error retrieving issues by date range:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





