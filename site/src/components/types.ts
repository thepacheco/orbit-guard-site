export interface Feature {
  icon: string;
  title: string;
  sub: string;
}

export interface FloatChip {
  icon: string;
  text: string;
}

export interface Headline {
  line1: string;
  lasso: string;
  line2: string;
}

export interface Variant {
  key: string;
  name: string;
  hex: string;
  bg: string;
  text: string;
  ring: string;
  accent: string;
  headline: Headline;
  price: number;
  blurb: string;
  features: Feature[];
  floatChips: FloatChip[];
  dark: boolean;
}

export interface Pack {
  count: number;
  price: number;
  label: string;
  tag: string | null;
}
