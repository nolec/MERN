import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alerts = useSelector(state => state.alert);
  console.log(alerts);
  return (
    <>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => <div key={alert.id}>{alert.msg}</div>)}
    </>
  );
};

export default Alert;
