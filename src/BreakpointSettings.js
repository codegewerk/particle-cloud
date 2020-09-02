export default class BreakpointSettings {
  constructor(settings, responsive) {
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

  getOptionsForWidth(width) {
    const entry = this.breakpointSettings.find(
      (entry) => entry.breakpoint >= width
    );

    if (entry) return entry.settings;
    else return this.defaultSettings;
  }
}
