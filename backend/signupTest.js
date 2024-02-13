// testSignup.js
import fetch from 'node-fetch';
import 'dotenv/config';

const supabaseUrl = "https://gnumotcfovtrisrpyswr.supabase.co";
const CLIENTKEY = process.env.CLIENTKEY;

const signUpUrl = `${supabaseUrl}/auth/v1/signup`;

const testSignup = async (email, password) => {
    try {
      const response = await fetch(signUpUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": CLIENTKEY,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
};

testSignup("messi@hotmail.com", "messi123");