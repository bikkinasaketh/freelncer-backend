require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;


app.use(cors());
app.use(express.json());

const UserRoutes=require('./routers/UserRoutes')
const ProjectRoutes=require('./routers/projectRoutes')
const projectUpdateRoutes = require('./routers/projectUpdateRoutes');

app.use('/api/project-updates', projectUpdateRoutes);
app.get('/', (req, res) => {
    res.json({
        message: 'Freelancer Backend API is running'
    });
});
app.use('/api/users',UserRoutes)

app.use('/api/projects',ProjectRoutes)

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});


mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully');

        app.listen(PORT, () => {
            console.log(`Server is running at ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err.message);
    });