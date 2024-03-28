export class EventNotExistsError extends Error {
  code: number = 404;
  constructor() {
    super("Event not exists");
    this.name = "EventNotExistsError";
  }
}
