import 'dotenv/config';
const options = {
  headers: { 'Content-type': 'application/json' },
};

const supabaseUrl = "https://gnumotcfovtrisrpyswr.supabase.co";
const CLIENTKEY = process.env.CLIENTKEY;

const baseUrl = 'https://ca-dev-platforms.onrender.com/api/cars'; //kjører på localhost, må ordnes så det kan gjøres via render url


const data = async () => {
  const res = await fetch(baseUrl);
  const data = await res.json();
  console.log(data);
};

//POST request
const testPost = async (brand, color, price, img) => {
  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: options.headers,
      body: JSON.stringify({
        brand: brand,
        color: color,
        price: price,
        img: img,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.error('Failed to post data:', res.status, res.statusText);
    }
  } catch (error) {
    console.error('Error during the fetch:', error);
  }
};

//PUT request
const testPut = async (id, brand, color, price, img) => {

  const putUrl = `${baseUrl}${id}`;

  try {
    const res = await fetch(putUrl, {
      method: 'PUT',
      headers: options.headers,
      body: JSON.stringify({
        brand: brand,
        color: color,
        price: price,
        img: img,
      }),
    });
    
    if(res.ok) {
      const data = await res.json();
      console.log("Updated successfully", data);
    } else {
      console.error("Failed to Update data:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error during PUT request");
  }
};

//Sign Up fetch test

const signUpUrl = `https://ca-dev-platforms.onrender.com/api/signup`;

const testSignup = async (firstName, lastName, email, password) => {
    try {
      const response = await fetch(signUpUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
     
       
        },
        body: JSON.stringify({
          firstName:firstName,
          lastName:lastName,
          email:email,
          password:password,
        }),
      });
  
      const data = await response.json();
      console.log(data, response);
    } catch (error) {
      console.error("Error:", response.status, response.statusText, error);
    }
};

//Sign In fetch test

const signInUrl = `https://ca-dev-platforms.onrender.com/api/signin`;

const testSignIn = async (email, password) => {
    try {
        const response = await fetch(signInUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "apikey": CLIENTKEY
            },
            body: JSON.stringify({
               email: email,
               password: password
            })
        })
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error", error);
    }
};

testSignIn("samailtest@gmail.com","samailtest");
