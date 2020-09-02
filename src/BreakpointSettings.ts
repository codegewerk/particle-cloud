import { ParticleSettings } from "./Settings";

export interface ResponsiveOptionEntry {
  breakpoint: number;
  options: ParticleSettings;
}

export interface BreakpointSettingsEntry {
  breakpoint: number;
  settings: ParticleSettings;
}

export default class BreakpointSettings {
  private defaultSettings: ParticleSettings;
  private breakpointSettings: Array<BreakpointSettingsEntry>;

  constructor(
    settings: ParticleSettings,
    responsive: Array<ResponsiveOptionEntry>
  ) {
    this.defaultSettings = settings;

    this.breakpointSettings = [];
    for (let breakpointEntry of responsive) {
      const { breakpoint, options } = breakpointEntry;

      this.breakpointSettings.push(
        Object.assign(
          {},
          {
            breakpoint,
            settings: Object.assign({}, this.defaultSettings, options),
          }
        )
      );
    }

    this.breakpointSettings.sort((a, b) => a.breakpoint - b.breakpoint);
  }

  getOptionsForWidth(width: number) {
    const entry = this.breakpointSettings.find(
      (entry) => entry.breakpoint >= width
    );

    if (entry) return entry.settings;
    else return this.defaultSettings;
  }
}
