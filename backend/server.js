import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://gnumotcfovtrisrpyswr.supabase.co', process.env.CLIENTKEY);
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
        }
        else {
            console.log('Data inserted successfully');
            response.end();
        }
    }
    catch (error) {
        console.error('Error during database operation:', error);
    }
});
app.listen(PORT, () => {
    console.log('Server running on', PORT);
});
