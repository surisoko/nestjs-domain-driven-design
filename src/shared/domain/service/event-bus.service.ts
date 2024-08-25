import { DomainEvent } from '../event/domain-event'

export interface EventBus {
  publish(event: DomainEvent[]): void
}

export const eventBusDefinition = {
  name: 'EventBus',
}
