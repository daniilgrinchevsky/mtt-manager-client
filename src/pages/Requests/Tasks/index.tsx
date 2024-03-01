import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const Tasks = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='Задачи' parentTitle='Заявки' crumbTitle='Задачи' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default Tasks;
