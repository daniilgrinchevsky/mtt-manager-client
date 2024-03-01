import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const DepartureSchedule = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='График выездов' parentTitle='Заявки' crumbTitle='График выездов' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default DepartureSchedule;
