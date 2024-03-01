import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const Calendar = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.REQUEST_CALENDAR.title} parentTitle='Заявки' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default Calendar;
