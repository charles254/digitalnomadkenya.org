/**
 * Injects a JSON-LD structured data script into the document head.
 */
export const injectJSONLD = (data, id) => {
  let script = document.getElementById(id);
  if (script) {
    script.textContent = JSON.stringify(data);
  } else {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
};

/**
 * Updates or creates meta tags (Description, OpenGraph, Twitter).
 */
export const updateMetaTags = (tags) => {
  Object.entries(tags).forEach(([name, content]) => {
    let selector = `meta[name="${name}"]`;
    if (name.startsWith('og:')) selector = `meta[property="${name}"]`;
    if (name.startsWith('twitter:')) selector = `meta[name="${name}"]`;
    if (name === 'description') selector = 'meta[name="description"]';

    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      if (name.startsWith('og:')) el.setAttribute('property', name);
      else el.name = name;
      document.head.appendChild(el);
    }
    el.content = content;
  });
};

/**
 * Sets the canonical URL for the page.
 */
export const setCanonical = (url) => {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
};
