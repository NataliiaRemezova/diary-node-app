import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={incrementCount}>Click to increment</button>
      <p>{count}</p> 
    </div>
  );
}

export default App;
