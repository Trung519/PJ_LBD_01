import './App.css';
import { useState } from 'react';
import Table from './components/Table.jsx';
import UserInput from './components/UserInput.jsx';
import EventName from './components/EventName.jsx'; 

function App() {

  const [userInput, setUserInput] = useState({
    productName: '',
    productQuantity: 0,
    productPrice: 0
  });
  
  const [tableData, setTableData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataObj = (data) => [...data, userInput];
    setTableData(dataObj);
    const isEmpty = { productName: '', productQuantity: 0, productPrice: 0 };
    setUserInput(isEmpty);
  }

  const handleChange = (event) => {
    const value = (res) => ({
      ...res,
      [event.target.name]: event.target.value,});
      setUserInput(value);
  };

  return (
    <div className="App">
      <EventName />
      <UserInput userInput={userInput} onChange={handleChange} onSubmit={handleSubmit} />
      <Table tableData={tableData} />
    </div>
  );
}

export default App;
