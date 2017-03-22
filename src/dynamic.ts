export interface Dynamic {
    type: string; // view, partial, content
    contentType?: string;
    safeLabel?: string;
    slug?: string;
    viewReference?: string;
    viewType?: string;
    fallback?: boolean;
}
