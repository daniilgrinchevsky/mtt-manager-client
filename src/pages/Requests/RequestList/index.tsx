import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const RequestList = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.REQUEST_LIST.title} parentTitle='Заявки' crumbTitle='Список заявок' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default RequestList;
