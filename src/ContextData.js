// RecordsContext.js
import React, { createContext, useContext, useState } from 'react';

const ContextData = createContext();

export const useRecords = () => useContext(ContextData);

export const RecordsProvider = ({ child }) => {
  const [records, setRecords] = useState([]);
  const [idCount, setIdCount] = useState(1);

  const addRecord = (newRecord) => {
    const recordWithId = { ...newRecord, id: idCount };
    setIdCount(idCount + 1);
    setRecords([...records, recordWithId]);
  };

  const editRecord = (id, updatedRecord) => {
    const updatedRecords = records.map(record =>
      record.id === id ? { ...record, ...updatedRecord } : record
    );
    setRecords(updatedRecords);
  };

  const deleteRecord = (id) => {
    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
  };

  return (
    <ContextData.Provider value={{ records, addRecord, editRecord, deleteRecord}}>
      {child}
    </ContextData.Provider>
  );
};
