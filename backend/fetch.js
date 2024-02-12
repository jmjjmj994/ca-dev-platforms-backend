import 'dotenv/config';
const options = {
  headers: { 'Content-type': 'application/json' },
};

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

      })
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

testPost('Hummer', 'Orange', '20000', '');
testPut();