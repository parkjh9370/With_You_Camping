const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const { sequelize } = require('./models');
dotenv.config();
const app = express();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch(err => {
    console.error(err);
  });

const corsOption = {
  origin: '*',
  credentials: true, // allow the Access-Control-Allow-Credentials
};

app.use(cors(corsOption));
// app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(cookieParser()); 
app.use(helmet());

app.use(morgan('dev'));

app.use('/', indexRouter);

// http://15.164.104.171/
app.get('/api', (req, res) => {
  res.send('서버 연결 테스트');
});

// 지원하지 않는 api
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 서버 에러
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8000, () => {
  console.log(`8000번 포트에서 대기중`);
});
