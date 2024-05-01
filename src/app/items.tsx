'use client'
import React, { useEffect, useState } from 'react';
import data from '../testingDocuments.json';
import { School } from './types';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);
  const [levelRange, setLevelRange] = useState({ min: 0, max: 150 });
  console.log('data: ', data.Hats);

  useEffect(() => {
    setItems(data.Hats); // Load your data here
  }, []);

  const filteredItems = items.filter(item => 
    (selectedSchools.length === 0 || selectedSchools.includes(item.School as School)) &&
    item.LevelRequirement >= levelRange.min &&
    item.LevelRequirement <= levelRange.max
  );

  const toggleSchool = (school: School) => {
    setSelectedSchools(prev =>
      prev.includes(school) ? prev.filter(s => s !== school) : [...prev, school]
    );
  };
  

  return (
    <>
      <h2>Filters:</h2>
      <div>
        {Object.values(School).map(school => (
          <button
            key={school}
            className={
                selectedSchools.includes(school) ? 'bg-red rounded-full w-14' : 'bg-white rounded-full w-14'}
            onClick={() => toggleSchool(school)}
          >
            <img className='w-14' src={`/symbols/${school.toLowerCase()}.png`} alt={school} />
          </button>
        ))}
        <input type="number" value={levelRange.min} onChange={(e) => setLevelRange({...levelRange, min: parseInt(e.target.value)})} />
        <input type="number" value={levelRange.max} onChange={(e) => setLevelRange({...levelRange, max: parseInt(e.target.value)})} />
      </div>
      <div>Items will go here</div>
      {filteredItems.map((hat, index) => (
        <div key={index}>
          <h2>{hat.Name}</h2>
          <p>{hat.LevelRequirement}</p>
          <p>{hat.School}</p>
          <p>{hat.Type}</p>
        </div>
      ))}
    </>
  );
};

export default ItemsList;