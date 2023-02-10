// Fact.tsx
import React, { useState, useEffect } from "react";

interface Props {
  isAllPhasesCompleted: boolean;
}

export const Fact: React.FC<Props> = ({ isAllPhasesCompleted }) => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    if (isAllPhasesCompleted === false) {
      setFact("");
      return;
    }

    fetch("https://uselessfacts.jsph.pl/random.json")
      .then((res) => res.json())
      .then((data) => {
        setFact(data.text);
      });
  }, [isAllPhasesCompleted]);

  return <div className="animate-text">{fact}</div>;
};
