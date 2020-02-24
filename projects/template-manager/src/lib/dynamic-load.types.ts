export interface Dynamic {
    contentType?: string;
    fallback?: boolean;
    safeLabel?: string;
    slug?: string;
    type: string; // view, partial, content
    viewReference?: string;
    viewType?: string;
}

export type WcmData = Record<string | number | symbol, any> & {
  contentType?: string;
  meta?: {
    contentType?: string;
    safeLabel?: string;
    slug?: string;
  };
  viewReference?: string;
  viewType?: string;
};
