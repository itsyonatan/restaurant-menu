import React, { useState, useEffect } from 'react';
import './App.css';
import {MenuItem} from "./component/menuItem"

const App = () => {
  const [menuData, setMenuData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch JSON data (Replace the URL with your endpoint or local file path)
    fetch('/menu.json') // Replace with actual path or API endpoint
      .then(response => response.json())
      .then(data => {
        const transformedData = data.values.slice(1).map(item => ({
          name: item[0],
          image: item[1],
          price: item[2],
          category: item[3]
        }));
        setMenuData(transformedData);
        const groupedCategories = [...new Set(transformedData.map(item => item.category))];
        setCategories(groupedCategories);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  /*const handleScrollToCategory = (category) => {
    document.getElementById(category).scrollIntoView({ behavior: 'smooth' });
  };*/

  return (
    <div className="app-container">
      {/*<header className="header">
        {categories.map(category => (
          <button className='header-btn' key={category} onClick={() => handleScrollToCategory(category)}>
            {category}
          </button>
        ))}
      </header>*/}

      <main>
        {categories.map(category => (
          <section key={category} id={category} className="category-section">
            <h2>{category}</h2>
            <div className="menu-items">
              {menuData.filter(item => item.category === category).map((item, index) => (
                <MenuItem item = {item} key = {index} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default App;
