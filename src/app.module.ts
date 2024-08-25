import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ProductsModule } from './products/infrastructure/module/products.module'
import { PrismaClient } from '@prisma/client'
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter'
import { eventBusDefinition } from './shared/domain/service/event-bus.service'
import { EventEmitterService } from './shared/infrastructure/service/event-emitter.service'
import { marketingToolServiceDefinition } from './shared/domain/service/marketing-tool.service'
import { MailtrapMarketingToolService } from './shared/infrastructure/service/mailtrap-marketing-tool.service'

export const prisma = new PrismaClient()

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    EventEmitter2,
    ProductsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: eventBusDefinition.name,
      useClass: EventEmitterService,
    },
    {
      provide: marketingToolServiceDefinition.name,
      useClass: MailtrapMarketingToolService,
    },
  ],
  exports: [
    {
      provide: eventBusDefinition.name,
      useClass: EventEmitterService,
    },
    {
      provide: marketingToolServiceDefinition.name,
      useClass: MailtrapMarketingToolService,
    },
  ],
})
export class AppModule {}
