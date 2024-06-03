import React, { useContext } from "react";
import { AddressContext } from "../context/AddressContext";
// import { Link } from "react-router-dom";

const AddressList: React.FC = () => {
  const { addresses } = useContext(AddressContext);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">List of Addresses</h2>
        {addresses.length === 0 ? (
          <p>No addresses registered.</p>
        ) : (
          <div>
            {addresses.map((address, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
                <h3 className="font-bold text-lg">{address.fullName}</h3>
                <p className="text-sm font-semibold">{address.mobilePhone}</p>
                <p className="text-xs text-black opacity-75">{address.addressLine}</p>
                <p className="text-xs text-black opacity-75">{`${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`}</p>
                <div>
                    {/* <Link to={`/address/edit/${index + 1}`}>Editar</Link> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressList;
