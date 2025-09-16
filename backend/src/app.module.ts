import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DonationsModule } from './donations/donations.module';
import { StellarModule } from './stellar/stellar.module';

@Module({
  imports: [AuthModule, UsersModule, DonationsModule, StellarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
