import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const Calendar = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='Календарь' parentTitle='Заявки' crumbTitle='Календарь' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default Calendar;
