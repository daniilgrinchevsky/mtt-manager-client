import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const MailBoxes = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='Почтовые ящики' parentTitle='Интеграции' crumbTitle='Почтовые ящики' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default MailBoxes;
