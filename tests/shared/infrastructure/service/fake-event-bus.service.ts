import { DomainEvent } from 'src/shared/domain/event/domain-event'
import { EventBus } from 'src/shared/domain/service/event-bus.service'

export class FakeEventBus implements EventBus {
  public wasPublished: boolean = false
  public currentEvent: Object

  publish(event: DomainEvent[]): void {
    this.wasPublished = true
    this.currentEvent = event[0]
  }
}
