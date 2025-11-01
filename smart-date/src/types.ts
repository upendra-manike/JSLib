export interface SmartDateOptions {
  locale?: string;
}

export interface RelativeTimeOptions {
  showSeconds?: boolean;
  showFuture?: boolean;
  threshold?: {
    seconds?: number;
    minutes?: number;
    hours?: number;
    days?: number;
  };
}

