declare module 'react-google-recaptcha' {
  import { Component, RefObject } from 'react';

  export interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    onErrored?: () => void;
    size?: 'compact' | 'normal' | 'invisible';
    badge?: 'bottomright' | 'bottomleft' | 'inline';
    theme?: 'light' | 'dark';
    tabindex?: number;
    hl?: string;
    ref?: RefObject<ReCAPTCHA>;
  }

  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {
    reset(): void;
    execute(): void;
    getValue(): string | null;
  }
}
