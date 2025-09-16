import { Module } from "@nestjs/common";
import { StellarService } from "./stellar.service";
import { StellarController } from "./stellar.controller";

import * as StellarSdk from '@stellar/stellar-sdk';

@Module({
    providers: [
        StellarService,
        {
        provide: StellarSdk.Horizon.Server,
        useFactory: () => {
            return new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
        },
        },
    ],
    controllers: [StellarController],
    exports: [StellarService],
})

export class StellarModule {}