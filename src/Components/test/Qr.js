import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Test = (props) => {
  const [data, setData] = useState('No result');

  return (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            console.log(result);
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
      />
      <p>{data}</p>
    </div>
  );
};

export default Test;