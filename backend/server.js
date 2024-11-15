
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})


const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.DATABASE;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected successfully '))
.catch(err => console.log(err));

const app = require('./app');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
