type NotificationErrorProps = {
  message: string;
  context: string;
};

class Notification {
  private errors: NotificationErrorProps[] = [];
  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  messages(context?: string): string {
    let message = "";
    this.errors.forEach((err) => {
      if (context === undefined || err.context === context) {
        message += `${err.context}: ${err.message},`;
      }
    });
    return message;
  }
}

export { Notification, NotificationErrorProps };
