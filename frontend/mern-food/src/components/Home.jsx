import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

const Home = () => {
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    let response = await fetch("http://localhost:3004/api/v1/foods", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    setFoodItem(data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredFoodItems = foodItem.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

     

  <br/>

      <div className="d-flex" role="search">
          <input
            className="form-control me-2 w-50"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '300px', marginLeft: '200px' }} 
          />
        </div>



      <div className="container">
        <div className="row mb-3">
          {filteredFoodItems.map((data) => (
            <div key={data._id} className="col-12 col-md-4">
              <Card foodItem={data} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
