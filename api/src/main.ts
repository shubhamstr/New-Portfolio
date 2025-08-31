/* eslint-disable @typescript-eslint/no-explicit-any */
const express = require('express')
const db = require('./db')

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 5000;

const app: any = express();

app.use(express.json());

// Simple CORS middleware
app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  next();
});


// Routes

app.get('/', (req: any, res: any) => {
  res.send({ message: 'Server is running..' });
});

app.get('/get/:type', async (req: any, res: any) => {
  try {
    const type = req.params.type || '';
    if (!type) {
      return res.json({ error: true, message: 'Type is required' });
    }
    let data = null;
    if (type === 'skills') {
      data = await db.getData('/skills');
    } else if (type === 'URLs') {
      data = await db.getData('/URLs');
    } else if (type === 'all') {
      data = await db.getData('/');
    } else {
      return res.json({ error: true, message: 'Invalid type' });
    }
    // console.log(data)
    res.json({ error: false, message: 'Data fetched successfully', data });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

// app.get('/create', async (req: any, res: any) => {
//   const users = await db.push('/users[]', { id: 1, name: 'Shubham' })
//   console.log(users)
//   res.send(users);
// });

// app.get('/skills', async (req: any, res) => {

// // Add data
// db.data.users.push({ id: 1, name: 'Shubham' })

// // Write changes back to file
// await db.write()
//   res.send(skills);
// });

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
