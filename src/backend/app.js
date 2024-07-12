const express = require('express');
const app = express();
const sequelize = require('./config/database');
const userRoutes = require('./routes/users');


app.use(express.json());


app.use('/api', userRoutes);


sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

sequelize.sync();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));