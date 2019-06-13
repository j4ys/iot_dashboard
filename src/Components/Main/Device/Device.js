import React from "react";
import { ChangeStatusBtn } from "./ChangeStatusBtn";
import { IncreaseTemp } from "./IncreaseTemp";
import { DecreaseTemp } from "./DecreaseTemp";
import { SyncAllDevices } from "./SyncAllDevices";
import "./Device.css";

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
      human,
      sync
    } = this.props.device;
    const humanpresencesrc = `${
      human ? "/assets/humangreen.png" : "/assets/humanred.png"
    }`;
    const statusclass = `device-status ${status ? "status-on" : "status-off"}`;
    return (
      <div className="device" key={id}>
        <div className="device-up">
          <span className="device-name">{name}</span>
          <span className="device-location">{location}</span>
          <span className="device-deviceid">{device_id}</span>
        </div>
        <div className="device-down">
          <ChangeStatusBtn
            device_id={device_id}
            refreshData={this.props.refreshData}
          />
          <span className="temp-controllers">
            <IncreaseTemp
              device_id={device_id}
              refreshData={this.props.refreshData}
              isdisabled={status}
            />
            <DecreaseTemp
              device_id={device_id}
              refreshData={this.props.refreshData}
              isdisabled={status}
            />
          </span>
          <span className="device-temp">{temp}&deg; C</span>
        </div>
        <div className="visuals">
          
          <span className="device-ctemp">{ctemp}&deg;C</span>
          <SyncAllDevices
            temp={temp}
            sync={sync}
            refreshData={this.props.refreshData}
          />
        </div>
	    <div className="visuals2">
	   <span className="human-presence">
            <img src={humanpresencesrc} alt="human" className="human-icon" />
          </span> 
          <span className={statusclass} />
	    </div>
      </div>
    );
  }
}
