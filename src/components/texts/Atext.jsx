import React, { useState, useEffect } from "react";
import TextTransition, { presets } from "react-text-transition";


const TextTransitionComponent = () => {
  const [index, setIndex] = useState(0);
    const TEXTS = ["Hello", "World", "React", "Transitions"];


  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1>
      <TextTransition
        text={TEXTS[index % TEXTS.length]}
        springConfig={presets.wobbly}
      />
    </h1>
  );
};

export default TextTransitionComponent;
