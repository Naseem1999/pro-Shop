import express from 'express';
import path from 'path'
import dotenv from 'dotenv';
import ConnectDB from './Config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from "cookie-parser";
dotenv.config();

const Port=process.env.PORT || 5000;
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
 
ConnectDB();


app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);
app.get('/api/config/paypal',(req,res)=>
    res.send({clientId:process.env.PAYPAL_CLIENT_ID})
)

const __dirname=path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }
app.use(notFound);
app.use(errorHandler);
app.listen(Port,()=>console.log(`server is running on port ${Port}`))
   