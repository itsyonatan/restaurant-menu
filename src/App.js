import React, { useState, useEffect } from 'react';
import './App.css';
import { MenuItem } from "./component/menuItem"

const App = () => {
  const [menuData, setMenuData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/menu.json')
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

  const handleScrollToCategory = (category) => {
    document.getElementById(category).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <header className="header">
        {categories.map(category => (
          <button className='header-btn' key={category} onClick={() => handleScrollToCategory(category)}>
            {category.split(" ")[0]}
          </button>
        ))}
      </header>
      <div className='menu-header'>
        <span>MENU <p>Very Tasty</p></span>
        <p className='sub-header'>best restaurant in town</p>
        <div className="search-bar">
          <input type="text" placeholder='search by food name...' value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
      </div>

      <main>
        {categories.map(category => (
          <section key={category} id={category} className="category-section">
            <div className='category-image'>
              <img src={`/${category}.png`} alt={category} />
              <h3>{category.split(" ")[0]}</h3>
            </div>
            <div className="menu-items">
              {menuData.filter(item => item.category === category && item.name.toLowerCase().includes(filter.toLowerCase()))
                .map((item, index) => (
                  <MenuItem item={item} key={index} />
                ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default App;
