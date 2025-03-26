const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.log('❌ MongoDB connection error:', err));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: true }));

app.use('/', authRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
