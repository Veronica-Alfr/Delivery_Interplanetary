import React, { useContext, useEffect, useState } from "react";
import IAddressEdit from "../interface/IAddressEdit";
import axios from "axios";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AddressContext } from "../context/AddressContext";
import { getAddressById, registerAddress, updateAddress } from "../api/AddressAPI";

const AddressRegisterOrEdit: React.FC = () => {
  const apiKey = import.meta.env.GOOGLE_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });
  
  const { addAddress } = useContext(AddressContext);

  const [address, setAddress] = useState<IAddressEdit>({
    label: "",
    zipCode: "",
    country: "",
    addressLine: "",
    city: "",
    state: "",
    fullName: "",
    mobilePhone: "",
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { addressId } = useParams<{ addressId: string }>();

  const isEditMode = pathname.includes("edit");

  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  useEffect(() => {
    const dataAddressById = async () => {
      try {
        if (addressId) {
          const addressDetails = await getAddressById(Number(addressId));
          setAddress(addressDetails);
        }
      } catch (error) {
        throw new Error("Error searching address");
      }
    };

    dataAddressById();
  }, [addressId]);

  const { zipCode, addressLine, city, state, country } = address;
  if (
    zipCode !== "" &&
    addressLine !== "" &&
    city !== "" &&
    state !== "" &&
    country !== ""
  ) {
    const fetchLocation = async () => {
      const fullAddress = `${addressLine}, ${city}, ${state}, ${zipCode}, ${country}`;

      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            fullAddress
          )}&key=${apiKey}`
        );

        if (response.data.status === "OK" && response.data.results.length > 0) {
          const location = response.data.results[0].geometry.location;
          setPosition({ lat: location.lat, lng: location.lng });
        } else {
          console.error("Endereço não encontrado ou resposta inválida da API");
        }
      } catch (error) {
        console.error("Erro ao buscar a localização:", error);
      }
    };
    fetchLocation();
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !address.label ||
      !address.zipCode ||
      !address.addressLine ||
      !address.city ||
      !address.country ||
      !address.zipCode ||
      !address.state ||
      !address.fullName
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {

      if (isEditMode && addressId) {
        await updateAddress(addressId, address);
      } else {
        await registerAddress(address);
        addAddress(address);
      }

      navigate("/address/list");
    } catch (error) {
      throw new Error("Error processing address");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 p-8 bg-white rounded shadow-md flex flex-col items-center w-full md:max-w-2xl lg:max-w-4xl"
      >
        <div className="w-full">
          <label className="block mb-0 text-sm font-semibold mb-1">
            Address Label:
            <input
              type="text"
              name="label"
              value={address.label}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded p-2"
            />
          </label>
        </div>
        <div className="flex flex-col mb-4 w-full">
          <div className="flex flex-col sm:flex-row mb-2">
            <div className="w-full sm:mr-2 mb-2">
              <label className="block text-sm font-semibold mb-1">
                Full Name:
                <input
                  type="text"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded p-2"
                />
              </label>
            </div>
            <div className="w-full">
              <label className="block text-sm mb-2 font-semibold mb-1">
                Mobile Phone:
                <input
                  type="text"
                  name="mobilePhone"
                  value={address.mobilePhone}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded p-2"
                />
              </label>
            </div>
          </div>
          <div className="col-span-2 mb-2">
            <label className="block text-sm font-semibold mb-1">
              Address Line:
              <input
                type="text"
                name="addressLine"
                value={address.addressLine}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded p-2"
              />
            </label>
          </div>
          <div className="flex flex-col sm:flex-row mb-2">
            <div className="w-full mb-2 sm:mr-2">
              <label className="block text-sm mb-2 font-semibold mb-1">
                Country:
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded p-2"
                />
              </label>
            </div>
            <div className="w-full">
              <label className="block text-sm mb-2 font-semibold mb-1">
                State:
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded p-2"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-2">
            <div className="w-full mb-2 sm:mr-2">
              <label className="block text-sm mb-2 font-semibold mb-1">
                City:
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded p-2"
                />
              </label>
            </div>
            <div className="w-full">
              <label className="block text-sm mb-2 font-semibold mb-1">
                Zip Code:
                <input
                  type="text"
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded p-2"
                />
              </label>
            </div>
          </div>
        </div>
        {isLoaded && (
          <div className="google-map">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={position}
              zoom={18}
            ></GoogleMap>
          </div>
        )}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressRegisterOrEdit;
