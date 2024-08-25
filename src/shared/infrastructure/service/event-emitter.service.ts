import { Inject } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { DomainEvent } from 'src/shared/domain/event/domain-event'
import { EventBus } from 'src/shared/domain/service/event-bus.service'

export class EventEmitterService implements EventBus {
  public constructor(
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2,
  ) {}

  public publish(events: DomainEvent[]): void {
    events.forEach((event: DomainEvent) => {
      this.eventEmitter.emit(event.name, event)
    })
  }
}
