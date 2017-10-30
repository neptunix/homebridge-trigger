'use strict'

let Service, Characteristic, HomebridgeAPI, UUIDGen

module.exports = (homebridge) => {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic
  HomebridgeAPI = homebridge
  UUIDGen = homebridge.hap.uuid

  homebridge.registerAccessory("homebridge-trigger", "FakeTrigger", FakeTrigger);
}

class FakeTrigger {
  constructor(log, config) {
    this.log = log
    this.name = config.name
    this.interval = config.interval < 60 ? 60000 : config.interval * 1000 // Lets not flood HomeKit
  
    this._sensor = new Service.ContactSensor(this.name)
    this._sensor.contactState = false
    this._sensor.getCharacteristic(Characteristic.ContactSensorState)
      .on('get', (callback) => {
        //this.log(`Gettings state ${this._sensor.contactState}`)
        callback(null, this._sensor.contactState)
      })
    

    setInterval( () => {
      // Change sensor state every this.interval seconds
      this._sensor.contactState = !this._sensor.contactState
      //this.log(`Setting state to ${this._sensor.contactState}`)
      this._sensor.setCharacteristic(Characteristic.ContactSensorState, this._sensor.contactState)
    }, this.interval)
  }

  getServices () {
    return [this._sensor]
  }
}
