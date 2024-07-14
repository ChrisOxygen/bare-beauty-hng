import { useState } from "react";

const shippingMethods = [
  {
    title: "Free Shipping",
    description: "10-14 working days",
    price: 0,
    id: "shm--001",
  },
  {
    title: "Standard Shipping",
    description: "3-5 working days",
    price: 14,
    id: "shm--003",
  },
  {
    title: "Express Shipping",
    description: "2-3 working days",
    price: 20,
    id: "shm--002",
  },
];

function ShippingMethodSelector() {
  const [selectedMethod, setSelectedMethod] = useState(shippingMethods[0].id);

  const handleSelectMethod = (id: string) => {
    setSelectedMethod(id);
  };
  return (
    <>
      {shippingMethods.map((method) => (
        <button
          key={method.id}
          className="shipping-option"
          onClick={() => handleSelectMethod(method.id)}
        >
          <div className="shipping-option__details">
            <span className="radio-bg">
              <span
                className={`radio-fg ${
                  method.id === selectedMethod ? "radio-fg--active" : ""
                }`}
              ></span>
            </span>
            <div className="shipping-option__title-desc">
              <span className="shipping-option-title">{method.title}</span>
              <span className="shipping-option-desc">{method.description}</span>
            </div>
          </div>
          <span className="shipping-option__price">${method.price}</span>
        </button>
      ))}
    </>
  );
}

export default ShippingMethodSelector;
