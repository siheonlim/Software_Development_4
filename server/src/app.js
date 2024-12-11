// // express 설정
// import createError from 'http-errors';
// import express from 'express';
// import logger from 'morgan';
// import cors from 'cors';


// import {  RecordRouter, UserRouter } from './routes';



// const app = express();


// // express 사용설정
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// app.use(cors({
//   origin: [
//     '*',
//     'http://localhost:3000',
//   ]
// }))



// // app.use('/test', TestRouter);
// app.use('/user', UserRouter)
// app.use('/record', RecordRouter)

// const port= 4090
// app.listen(port,()=>{
//   console.log(`${port}번 포트에서 실행중`)
// })


// app.use((req, res, next) => {
//   next(createError(404));
// });

// // 에러 처리 설정
// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({
//     message: err.message,
//     error: req.app.get('env') === 'development' ? err : {},
//   });
// });


// module.exports = app;



import express from 'express';
import cors from 'cors';
import UserRouter from './routes/controller/user.js';
import RecordRouter from './routes/controller/record.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', UserRouter);
app.use('/record', RecordRouter);

const PORT = 4090;
app.listen(PORT, () => console.log(`${PORT}번 포트에서 서버 실행 중`));
module.exports = app;