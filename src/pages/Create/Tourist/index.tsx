import React from 'react';
import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const Request = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.CREATE_TOURIST.title} parentTitle='Создать' crumbTitle='Туриста' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default Request;
