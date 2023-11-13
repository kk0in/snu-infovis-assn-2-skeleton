import React from 'react';
import Select from 'react-select';

const ControlBar = ({ attributes, onSelectionChange }) => {
  const { nominal, ordinal, quantitative } = attributes;

  // Prepare options for each dropdown
  const createSelectOptions = (items) => items.map(item => ({ value: item, label: item }));

  const dropdownContainerStyle = {
    display: 'flex',
    // justifyContent: 'space-between', 
    marginBottom: '20px', 
  };

  const dropdownStyle = {
    display: 'flex',
    width: '200px', 
  };

  const labelStyle = {
    display: 'flex',
    marginRight: '10px',
  };

  return (
    <div style={dropdownContainerStyle}>
      <div style={dropdownStyle}>
        <label style={labelStyle}>x: </label>
        <Select options={createSelectOptions(quantitative)} defaultValue={{ value: 'imdbRating', label: 'imdbRating' }} onChange={value => onSelectionChange('x', value)} />
      </div>
      <div style={dropdownStyle}>
        <label style={labelStyle}>y: </label>
        <Select options={createSelectOptions(quantitative)} defaultValue={{ value: 'usGross', label: 'usGross' }} onChange={value => onSelectionChange('y', value)} />
      </div>
      <div style={dropdownStyle}>
        <label style={labelStyle}>Color: </label>
        <Select options={createSelectOptions(['none', ...nominal, ...ordinal])} defaultValue={{ value: 'none', label: 'none' }} onChange={value => onSelectionChange('color', value)} />
      </div>
      <div style={dropdownStyle}>
        <label style={labelStyle}>Opacity: </label>
        <Select options={createSelectOptions(['none', ...quantitative])} defaultValue={{ value: 'none', label: 'none' }} onChange={value => onSelectionChange('opacity', value)} />
      </div>
      <div style={dropdownStyle}>
        <label style={labelStyle}>Size: </label>
        <Select options={createSelectOptions(['none', ...quantitative])} defaultValue={{ value: 'none', label: 'none' }} onChange={value => onSelectionChange('size', value)} />
      </div>
    </div>
  );
};

export default ControlBar;
