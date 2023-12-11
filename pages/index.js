import React, { useReducer, useEffect } from "react";

const initialState = { hotels: [], filteredHotels: [] };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, hotels: action.payload, filteredHotels: action.payload };

    case "FILTER":
      return {
        ...state,
        filteredHotels: state.hotels.filter(
          (hotel) =>
            hotel.city.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };

    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels"
        );
        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run once on mount

  const handleFilter = () => {
    dispatch({ type: "FILTER", payload: inputValue });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter city name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>

      <div>
        {state.filteredHotels.map((hotel) => (
          <p key={hotel.hotel_name}>{hotel.hotel_name}</p>
        ))}
      </div>
    </div>
  );
}
