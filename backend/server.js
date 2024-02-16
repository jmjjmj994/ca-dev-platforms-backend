import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://gnumotcfovtrisrpyswr.supabase.co';
const supabase = createClient(supabaseUrl, process.env.CLIENTKEY);
//cors
const app = express();
app.use(express.json());
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));
//Cors
const PORT = process.env.PORT;
//???
app.get('/', (request, response) => {
  response.send('cars');
});
app.get('/api/cars', async (request, response) => {
  const { data, error } = await supabase.from('cars').select('*');
  if (error)
    return response.status(404).json({ error: 'Problems fetching data' });
  response.json({ data });
});
app.post('/api/cars', async (request, response) => {
  const body = request.body;
  try {
    if (!body.brand || !body.color || !body.price)
      return response.status(404).json({ error: 'Props missing' }).end();
    const { data, error } = await supabase.from('cars').insert([
      {
        brand: body.brand,
        color: body.color,
        price: body.price,
        img: body.image,
      },
    ]);
    response.status(201).json({ success: `data inserted successfully` }).end();
    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully');
      response.end();
    }
  } catch (error) {
    console.error('Error during database operation:', error);
  }
});
app.put('/api/cars/:id', async (request, response) => {
  const { id } = request.params;
  const body = request.body;
  try {
    const { data, error } = await supabase
      .from('cars')
      .update({
        brand: body.brand,
        color: body.color,
        price: body.price,
        img: body.img,
      })
      .eq('id', id);
    if (error) {
      response.status(400).json({ error: error.message });
    } else {
      response.json({ message: 'Updated successfully', data });
    }
  } catch (error) {
    console.error('Error during PUT request', error);
  }
});
app.delete('/api/cars/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const { data, error } = await supabase.from('cars').delete().eq('id', id);
    if (error) {
      response.status(400).json({ error: error.message });
    } else {
      response.json({ message: 'Car deleted successfully', data });
    }
  } catch (error) {
    console.error('Error during DELETE request', error);
  }
});

//Users

//Sign up
app.post('/api/signup', async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  /*   try {
    const { user, error } = await supabase.auth.signUp({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    console.log(user);
    if (error) response.status(400).json({ error: error.message });
  } catch (error) {
    console.error(error);
  } finally {
    console.log(user);
    response
      .status(201)
      .json({ message: 'User created successfully', token: user.data.session.access_token });
  } */
  supabase.auth
    .signUp({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
    .then((user, error) => {
      if (error) {
        response.json({ error: 'Error' });
      } else {
        response.json(user.data.session.access_token);
      }
    });
});

//Sign in
app.post('/api/signin', async (request, response) => {


try{
  const {data, error} = await supabase.auth.signInWithPassword({
    email:'test123@gmail.com',
    password:'test123',
    })

    if(error) return response(404).response.end()
    console.log(data)
}catch(error) {}




/*  const {email, password} = request.body
    const { user, session, error } = await supabase.auth
    .signInWithPassword({
      email: email,
      password: password,
    }).then((user, error) => {
      if (error) {
        response.json({ error: 'Error' });
      } else {
        console.log(user)
        response.status(200).json({ message: 'User signed in successfully' });
      }
    }); */
});


app.get('/api/getuser', async (request, response) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      return response.status(400).json({ error: error.message });
    } else {
      response.status(200).json({ message: 'User found', data });
    }
  } catch (error) {
    response.status(500).json({ error: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log('Server running on', PORT);
});