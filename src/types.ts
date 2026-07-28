/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Room {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  type: 'room' | 'suite';
  view: string;
  priceInfo?: string; // e.g. "From $120 / night"
}

export interface Review {
  id: string;
  rating: number;
  quote: string;
  name: string;
  country: string;
}

export interface DiscoverCard {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  link: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
