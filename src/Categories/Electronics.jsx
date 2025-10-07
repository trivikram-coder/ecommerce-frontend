
import products from './data/data';
import { useNavigate } from 'react-router-dom';
import {Phone,Laptop} from 'lucide-react';
const Electronics = () => {
  const electronics = products.filter((item) => item.category === 'electronics');
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      <h2 className="text-center text-primary mb-4">Electronics   

        <Laptop size={25}/>
      </h2>
      <div className="row">
        {electronics.map((item) => (
          <div
            key={item.id}
            className="col-md-4 mb-4"
            onClick={() => navigate('/item', { state: { item } })}
            style={{ cursor: 'pointer' }}
          >
            <div className="card h-100 shadow-sm">
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
              style={{ height: '340px',padding:'24px' }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
               
                <p className="card-text">{item.description}</p>
                <del className="card-text text-danger fw-bold"> ₹{item.price}</del>
                <p className="card-text text-success fw-bold"> ₹{item.discountPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
