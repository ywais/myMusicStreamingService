import React from 'react';
import Table from "rc-table";

function RcTable({songs, type}) {
  const columns = Object.keys(songs[0]).map(key => ({
      title: key,
      dataIndex: key,
      key: key
    }));

  const data = songs.map(song => {
    let songInfo = Object.keys(song).map((key) => ({
      [key]: song[key]
    }));
    return Object.assign({}, ...songInfo);
  });

  if(songs[0].Title === null) {
    return <h4>No songs {type==='artist'?'for':'in'} {type}</h4>;
  } else {
    return (
      <Table
        columns={columns}
        data={data}
        tableLayout="auto"
      />
    );
  }
};

export default RcTable;