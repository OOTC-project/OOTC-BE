import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PASSPORT_OUTBOUND_PORT } from './outbound-port/passport.outbound-port';
import { LocalStrategy, PassportAdapter } from './outbound-adapter/passport.adapter';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
            session: true,
        }),
        AuthModule,
    ],
    providers: [
        LocalStrategy,
        JwtStrategy,
        {
            provide: PASSPORT_OUTBOUND_PORT,
            useFactory: (localStrategy: LocalStrategy) => new PassportAdapter(localStrategy),
            inject: [LocalStrategy],
        },
    ],
    exports: [PASSPORT_OUTBOUND_PORT],
})
export class PassportAdapterModule {}
