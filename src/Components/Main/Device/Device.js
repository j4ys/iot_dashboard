import React from "react";
import { ChangeStatusBtn } from "./ChangeStatusBtn";
import { IncreaseTemp } from "./IncreaseTemp";
import { DecreaseTemp } from "./DecreaseTemp";
import { RemoveDevice } from "./RemoveDevice";
// import { AddDevice } from "./AddDevice";

export default class Device extends React.Component {
  render() {
    // console.log("device component = " + this.props.device);
    const {
      id,
      name,
      status,
      device_id,
      temp,
      location,
      ctemp,
      human
    } = this.props.device;
    return (
      <div className="device" key={id}>
        <span className="name">{name}</span>
        <span className="device_id">{device_id}</span>
        <span className="location">{location}</span>
        <IncreaseTemp
          device_id={device_id}
          refreshData={this.props.refreshData}
          isdisabled={status}
        />
        <span className="temp">{temp}</span>
        <DecreaseTemp
          device_id={device_id}
          refreshData={this.props.refreshData}
          isdisabled={status}
        />
        <span className="human">
          human is : {human ? "present" : "not present"}
        </span>
        <span className="temp">current Temp : {ctemp}</span>
        <span className="status">{status ? "ON" : "OFF"}</span>
        <ChangeStatusBtn
          device_id={device_id}
          refreshData={this.props.refreshData}
        />
        <RemoveDevice
          device_id={device_id}
          isAdmin={this.props.isAdmin}
          refreshData={this.props.refreshData}
        />
      </div>
    );
  }
}
