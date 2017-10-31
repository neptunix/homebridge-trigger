# homebridge-trigger
Homeridge Plugin for Automations Triggering

# Why?
Devices within HomeKit newtwork can trigger actions - switches, motion and security sensors, thermostats.
These are value triggers including: power, brightness, contact, temperature, humidity, heating mode, battery level and so on.

Unfortunately custom values can not be used as triggers - "Turn the lights off then power consumption exceeds 100w".
But they can be used as trigger conditions! So you can make a rule like "Turn the lights off when temperature changes its value and power consumption exceeds 100w".

It lookes quite trashy and inreliable - if the temperature value does not change - the rule is not executed.

# How?
This is more like a hack to overcome the limitation of HomeKit not able to trigger actions on custom values. It works like that:
* Add a fake contact sensor that automatically triggers every n-seconds
* Make a rule "Turn the lights off when FakeTrigger changes state and power consumption exceeds 100w"

Lets set n to 60 seconds and HomeKit will run your rule every minute.
Now the cons. Need to check the impact on the iPhone's battery as it's the place where HomeKit lives (if you don't have an Apple TV).
Even with Apple TV not sure if it doesn't make you phone process the trigger every single time (hope it doesn't)

# Configuration
Install homebridge-trigger plugin and add accessories to your config.json `accessories` section. Example:
```
"accessories": [        
        {
          "accessory": "FakeTrigger",
          "name": "Trigger every 60 sec",
          "interval": 60
        }
    ]
```

Min interval value is set to 60 seconds in order not to flood HomeKit with too many requests
