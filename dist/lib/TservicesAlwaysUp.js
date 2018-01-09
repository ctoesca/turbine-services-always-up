"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const turbine = require("turbine");
var Ttimer = turbine.tools.Ttimer;
var TwindowsServiceManager = turbine.tools.TwindowsServiceManager;
const Promise = require("bluebird");
class TservicesAlwaysUp extends turbine.services.TbaseService {
    constructor(name, config) {
        super(name, config);
        this.stoppingService = false;
        this.startingService = false;
        this.windowsServiceManager = new TwindowsServiceManager();
        this.timer = new Ttimer({ delay: this.config.interval * 1000 });
        this.timer.on(Ttimer.ON_TIMER, this.onTimer, this);
    }
    flatify() {
        return new Promise(function (resolve, reject) {
            var r = {};
            resolve(r);
        }.bind(this));
    }
    getDefaultConfig() {
        return {
            "active": true,
            "executionPolicy": "one_per_server",
            "interval": 10,
            "services": {}
        };
    }
    start() {
        if (this.active && !this.started) {
            this.timer.start();
            super.start();
        }
    }
    stop() {
        if (this.started) {
            this.timer.stop();
            super.stop();
        }
    }
    checkService(name) {
        return this.windowsServiceManager.getServiceState(name)
            .then(function (state) {
            if (typeof state == "undefined") {
                throw new Error("service '" + name + "': state is not defined");
            }
            else {
                this.logger.debug("service '" + name + "': state=" + state);
                if (state == "STOPPED")
                    return this.windowsServiceManager.startService(name);
                else
                    return false;
            }
        }.bind(this));
    }
    onTimer() {
        for (var serviceName in this.config.services) {
            var svc = this.config.services[serviceName];
            if (svc.action == "always-up") {
                this.checkService(serviceName)
                    .then(function (result) {
                }.bind(this))
                    .catch(function (err) {
                    this.logger.error(err.toString());
                }.bind(this));
            }
        }
    }
}
exports.TservicesAlwaysUp = TservicesAlwaysUp;
exports.TservicesAlwaysUp = TservicesAlwaysUp;
//# sourceMappingURL=TservicesAlwaysUp.js.map