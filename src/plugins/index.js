/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";

pinia.use(piniaPluginPersistedstate);

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify).use(router).use(pinia);
}
