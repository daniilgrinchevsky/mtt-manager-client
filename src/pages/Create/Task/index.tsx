import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";
import {PAGE} from "../../../config/page";


const Task = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title={PAGE.CREATE_TASK.title} parentTitle='Создать' crumbTitle='Задачу' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default Task;
