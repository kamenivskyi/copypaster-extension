const jsonSettingsManifest = {
  name: "__MSG_name__", // "__MSG_name__" - dynamic value takes name from _locales/{lang}/message.json folder
  version: "1.0.0",
  manifest_version: 3, // the newest version is 3
  default_locale: "en", // by default extension is on english
  description: "__MSG_description__", // "__MSG_description__" - dynamic value takes description from _locales/{lang}/message.json folder
  icons: {
    32: "./icons/copypaste-32.png", // 32x32 icon
    64: "./icons/copypaste-64.png", // 64x64 icon
    128: "./icons/copypaste-128.png", // 128x128 icon
  },
  content_scripts: [
    {
      matches: ["https://stackoverflow.com/*"], // enables extension on all stackoverflow pages
      run_at: "document_idle", // "document_idle" run after page and all sources(js, css..) is loaded
      all_frames: false, // not insert script in iframe tag
      js: ["./content-script.js"], // paths for our scripts
    },
  ],
  host_permissions: ["https://stackoverflow.com/*"], // tell browser with what sites we want to work, if add ["https://stackoverflow.com/*" <all_url>] will enable permission for all sites(aggressive permission)
};