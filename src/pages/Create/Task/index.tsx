import React from 'react';

import MyBreadCrumb from "../../../Common/MyBreadCrumb";


const Task = () => {

  return (
    <React.Fragment>
      <MyBreadCrumb title='Создание задачи' pageTitle='Создать' crumbTitle='Задачу' />
      <div className="grid grid-cols-12 gap-x-5">
      </div>
    </React.Fragment>
  );
};

export default Task;
