import { Uuid } from '../value-object/uuid.value-object'

export abstract class DomainEvent {
  public readonly eventId: Uuid
  public readonly name: string
  public readonly occurredOn: Date
}
