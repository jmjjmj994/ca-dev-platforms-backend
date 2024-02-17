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
app.post('/api/register', async (request, response) => {
  try {
    const { email, password, firstName, lastName } = request.body;
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          firstName: firstName,
          lastName: lastName,
        },
      },
    });

    if (error) {
      return response.status(400).json({ message: error.message });
    }

    response.status(200).json({
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      session: {
        access_token: data.session.access_token,
        token_type: data.session.token_type,
        expires: data.session.expires_in,
      },
    });
  } catch (err) {
    response
      .status(500)
      .json({ message: 'Unexpected error occurred during signup.' });
  }
});

//Sign in
app.post('/api/login', async (request, response) => {
  const { email, password } = request.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(error, data);
    if (error) return response.json({ error: error.message }).end();
    response
      .json({
        token: data.session.access_token,
      })
      .end();
  } catch (error) {}
});

app.get('/api/getuser', async (request, response) => {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) {
      return response.status(400).json({ error: error.message });
    } else {
      console.log('Users', users);
      response.status(200).json({ message: 'User found', data });
    }
  } catch (error) {
    response.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log('Server running on', PORT);
});
