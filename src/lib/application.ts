// The addresses of the application, in one place: the footer reads them, the download buttons too.
export const repository = "https://github.com/sylent-dev/rust-exile-market";
export const issues = `${repository}/issues`;
export const releases = `${repository}/releases`;

// The archives of the latest release, under names that never change from one version to the next
// (roadmap.md, Needed in rust-exile-market).
const latest = `${releases}/latest/download`;
export const downloads = {
  windows: `${latest}/exile-market-windows-x64.zip`,
  linux: `${latest}/exile-market-linux-x64.tar.gz`,
};

// The single setting of the download area: « Coming soon » as long as it is false, the buttons once
// the tag v0.1.0 is out and its archives answer at the addresses above (specs.md, Main action).
export const downloadsOpen: boolean = true;
