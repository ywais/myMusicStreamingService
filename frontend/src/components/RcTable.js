import React from 'react';
import Table from "rc-table";

function RcTable({songs, type}) {
  if(songs.length && songs[0].Title !== null) {
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
    return (
      <Table
        columns={columns}
        data={data}
        tableLayout="auto"
      />
    );
  } else {
    return <h4>No songs {type==='artist'?'for':'in'} {type}</h4>;
  }
};

export default RcTable;