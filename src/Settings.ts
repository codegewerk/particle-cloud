export interface ParticleOptions {
  maxParticles?: number;
  sizeVariations?: number;
  speed?: number;
  color?: string | Array<string>;
  minDistance?: number;
  connectParticles?: boolean;
}

export interface ParticleSettings {
  maxParticles: number;
  sizeVariations: number;
  speed: number;
  color: string | Array<string>;
  minDistance: number;
  connectParticles: boolean;
}
