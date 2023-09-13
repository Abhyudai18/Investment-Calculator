import React, { useState } from "react";
import Header from "./components/Header/Header";
import UserInput from "./components/UserInput/UserInput";
import ResultsTable from "./components/ResultsTable/ResultsTable";

function App() {
  const [userInput, setUserInput] = useState(null); // yearlyData is managed as state here, //userInput is current Savings

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = [];

  if(userInput) {
  let currentSavings = userInput["current-savings"]; // feel free to change the shape of this input object!
  const yearlyContribution = userInput["yearly-contribution"]; // as mentioned: feel free to change the shape...
  const expectedReturn = userInput["expected-return"] / 100;
  const duration = userInput["duration"];

  for (let i = 0; i < duration; i++) {
    const yearlyInterest = currentSavings * expectedReturn;
    currentSavings += yearlyInterest + yearlyContribution;
    yearlyData.push({
      year: i + 1,
      yearlyInterest: yearlyInterest,
      savingsEndOfYear: currentSavings,
      yearlyContribution: yearlyContribution,
    });
  }
}

  return (
    <div>
      <Header></Header>
      <UserInput onCalculate={calculateHandler}></UserInput>

      {!userInput && <p style={{textAlign: 'center'}}>No interest calculated yet. </p>}
      {userInput && <ResultsTable data ={yearlyData} initialInvestment={userInput['current-savings']}/>} 
    </div>
  );
}

export default App;
//data is a prop and can be named anything