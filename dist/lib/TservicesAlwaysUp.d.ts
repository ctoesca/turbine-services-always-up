import * as turbine from "turbine";
import Ttimer = turbine.tools.Ttimer;
import TwindowsServiceManager = turbine.tools.TwindowsServiceManager;
export declare class TservicesAlwaysUp extends turbine.services.TbaseService {
    stoppingService: boolean;
    startingService: boolean;
    windowsServiceManager: TwindowsServiceManager;
    timer: Ttimer;
    constructor(name: any, config: any);
    flatify(): any;
    getDefaultConfig(): {
        "active": boolean;
        "executionPolicy": string;
        "interval": number;
        "services": {};
    };
    start(): void;
    stop(): void;
    checkService(name: any): any;
    onTimer(): void;
}
