
export const MenuItem = ({ item }) => {
  return (
    <div className="menu-item">
      <div className="item-container">
        <div className="item-image">
          <img src={item.image} alt={item.image} />
        </div>
        <div className="item-content">
          <h3 className="item-name">{item.name}</h3>
          <div className="item-description">
            <p className="item-category">{item.category}</p>
            <p className="item-price">{item.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

