import * as turbine from "turbine";
import Ttimer = turbine.tools.Ttimer;
import TwindowsServiceManager = turbine.tools.TwindowsServiceManager;
import Promise = require("bluebird");
export declare class TservicesAlwaysUp extends turbine.services.TbaseService {
    stoppingService: boolean;
    startingService: boolean;
    windowsServiceManager: TwindowsServiceManager;
    timer: Ttimer;
    constructor(name: string, application: turbine.Tapplication, config: any);
    flatify(): Promise<unknown>;
    getDefaultConfig(): {
        "active": boolean;
        "executionPolicy": string;
        "interval": number;
        "services": {};
    };
    start(): void;
    stop(): void;
    checkService(name: any): Promise<unknown>;
    onTimer(): void;
}
