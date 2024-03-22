export class EventNotExistsError extends Error {
  constructor() {
    super('Event not exists');
    this.name = 'EventNotExistsError';
  }
}