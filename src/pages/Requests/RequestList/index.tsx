import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const RequestList = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='Список заявок' parentTitle='Заявки' crumbTitle='Список заявок' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default RequestList;
