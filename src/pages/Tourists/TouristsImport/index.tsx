import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const TouristsImport = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='Импорт туристов' parentTitle='Туристы' crumbTitle='Импорт туристов' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default TouristsImport;
