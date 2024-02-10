import express, { response } from 'express';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
const app = express();

const supabase = createClient(
  'https://gnumotcfovtrisrpyswr.supabase.co',
  process.env.CLIENTKEY
);

app.get('/api/cars', async (request, response) => {
  const { data, error } = await supabase.from('cars').select('*');
  response.json({ data });
});
app.post('/api/cars/insert', async (request, response) => {
  const { error } = await supabase
    .from('cars')
    .insert({ id: 1, name: 'Denmark' });
  if (error) return response.status(404).json({ error: 'Problems' });
});
app.put('/api/cars/:id', async (request, responsne) => {
  const {id} = request.params; //Brukes til å få ID´en fra Url parameteret
  const updateData = request.body; 

  const {data, error} = await supabase
  .from("cars")
  .update(updateData)
  .match({id: id});

  if(error) return response.status(400).json({error: error.message});

  response.json({data})
})
app.delete('/api/cars/:id', async (request, response) => {

  const {data, error} = await supabase
    .from("cars")
    .delete()
    .match({id: id});

    if(error) {
      return response.status(400).json({error: error.message})
  }

  response.status(200).json({message: "Car deleted"})
  
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server running on', PORT);
});