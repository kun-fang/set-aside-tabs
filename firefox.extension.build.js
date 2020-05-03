const minVersion = "57.0a1";
const manifestVersion = 2;
const manifestMappingConfig = [
  {
    "key": "browser_specific_settings",
    "value": (config, package) => {
      let id = config.id || `${package.name.replace(/\s+/g, '-')}@${package.author.replace(/\s+/g, '-')}`;
      let minVer = config.minVersion || minVersion;
      return {
        "gecko": {
          id: id,
          strict_min_version: minVer
        }
      };
    }
  },
  {
    "key": "manifest_version",
    "value": manifestVersion
  },
  "name",
  "version",
  "description",
  {
    "key": "homepage_url",
    "value": (config, package) => {
      return config.homepage_url || package.homepage;
    }
  },
  "icons",
  "background",
  "content",
  "browser_action",
  "commands",
  "permissions",
  {
    "key": "content_security_policy",
    "value": (config, _) => {
      let csp = config.csp;
      if (!csp || !Array.isArray(csp)) {
        return null;
      } else {
        return csp.join("; ")
      }
    }
  }
]

function generateManifestField(mapConfig, config, package) {
  var key, value;
  if (typeof mapConfig === 'string') {
    key = mapConfig;
    value = config[key] || package[key];
  }
  if (typeof mapConfig === 'object' && mapConfig !== null) {
    key = mapConfig.key;
    value  = typeof mapConfig.value === 'function'
      ? mapConfig.value(config, package)
      : mapConfig.value;
  }
  return [key, value];
}

exports.generateMenifest = (config, package) => {
  return manifestMappingConfig.reduce((manifest, mapConfig) => {
    let [key, value] = generateManifestField(mapConfig, config, package);
    if (!!key && !!value) {
      manifest[key] = value;
    }
    return manifest;
  }, {});
}