import { DomainEvent } from 'src/shared/domain/event/domain-event'
import { Product } from '../entity/product.entity'
import { Uuid } from 'src/shared/domain/value-object/uuid.value-object'

export class ProductCreated implements DomainEvent {
  public readonly eventId: Uuid
  public readonly name = 'product.created'
  public readonly occurredOn: Date

  public constructor(public readonly product: Partial<Product>) {
    this.eventId = Uuid.create()
    this.occurredOn = new Date()
  }
}
