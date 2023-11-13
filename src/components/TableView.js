import React from 'react';
import MaterialTable from 'material-table';

const TableView = ({ selectedData }) => {
  const columns = [
    { title: 'title', field: 'title' },
    { title: 'genre', field: 'genre' },
    { title: 'creative_type', field: 'creative_type' },
    { title: 'release', field: 'release' },
    { title: 'rating', field: 'rating' },
  ];

  const options = {
    toolbar: false,
    paging: false,
    maxBodyHeight: 350,
    rowStyle: {
      fontSize: 12.5,
    },
  };

  return (
    <MaterialTable
      title="Selected Movies"
      columns={columns}
      data={selectedData}
      options={options}
    />
  );
};

export default TableView;


