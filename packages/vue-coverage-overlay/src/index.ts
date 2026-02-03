import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Plugin, ViteDevServer } from 'vite'

export interface VueCoverageOverlayOptions {
  /**
   * Path to the coverage file relative to project root
   * @default 'coverage/coverage-final.json'
   */
  coveragePath?: string

  /**
   * Endpoint path to serve coverage data
   * @default '/__coverage'
   */
  endpoint?: string

  /**
   * Keyboard shortcut to toggle overlay
   * @default 'ctrl+shift+c'
   */
  shortcut?: string

  /**
   * Enable by default on page load
   * @default false
   */
  enabledByDefault?: boolean
}

function generateClientScript(
  endpoint: string,
  shortcut: string,
  enabledByDefault: boolean,
): string {
  return `
(function() {
  const STORAGE_KEY = 'vue-coverage-overlay-enabled';
  const ENDPOINT = '${endpoint}';
  const SHORTCUT = '${shortcut}';
  const ENABLED_BY_DEFAULT = ${enabledByDefault};

  let enabled = localStorage.getItem(STORAGE_KEY) !== null 
    ? localStorage.getItem(STORAGE_KEY) === 'true'
    : ENABLED_BY_DEFAULT;
  let cachedCoverageData = null;
  let observer = null;
  let updateTimeout = null;
  const overlayedElements = new Set();

  // Toggle button UI
  function createToggleButton() {
    if (document.getElementById('vue-cov-toggle')) return;

    const container = document.createElement('div');
    container.id = 'vue-cov-toggle';
    container.innerHTML = \`
      <style>
        #vue-cov-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 999999;
          font-family: system-ui, -apple-system, sans-serif;
        }
        #vue-cov-toggle button {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          background: \${enabled ? '#22c55e' : '#6b7280'};
          color: white;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #vue-cov-toggle button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.4);
        }
        #vue-cov-toggle .legend {
          display: none;
          position: absolute;
          bottom: 60px;
          right: 0;
          background: #1f2937;
          border-radius: 8px;
          padding: 12px;
          min-width: 160px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        #vue-cov-toggle:hover .legend {
          display: block;
        }
        #vue-cov-toggle .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          font-size: 12px;
          margin-bottom: 6px;
        }
        #vue-cov-toggle .legend-item:last-child {
          margin-bottom: 0;
        }
        #vue-cov-toggle .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }
        #vue-cov-toggle .shortcut {
          color: #9ca3af;
          font-size: 10px;
          text-align: center;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid #374151;
        }
      </style>
      <div class="legend">
        <div class="legend-item"><div class="legend-color" style="background:#22c55e"></div>80%+ coverage</div>
        <div class="legend-item"><div class="legend-color" style="background:#eab308"></div>60-79% coverage</div>
        <div class="legend-item"><div class="legend-color" style="background:#f97316"></div>40-59% coverage</div>
        <div class="legend-item"><div class="legend-color" style="background:#ef4444"></div>&lt;40% coverage</div>
        <div class="shortcut">\${SHORTCUT.toUpperCase()}</div>
      </div>
      <button title="Toggle Coverage Overlay (\${SHORTCUT.toUpperCase()})">📊</button>
    \`;
    document.body.appendChild(container);

    container.querySelector('button').addEventListener('click', toggle);
  }

  function updateButtonState() {
    const btn = document.querySelector('#vue-cov-toggle button');
    if (btn) {
      btn.style.background = enabled ? '#22c55e' : '#6b7280';
    }
  }

  function toggle() {
    enabled = !enabled;
    localStorage.setItem(STORAGE_KEY, String(enabled));
    updateButtonState();

    if (enabled) {
      init();
    } else {
      removeAllOverlays();
    }
  }

  // Keyboard shortcut
  function setupShortcut() {
    document.addEventListener('keydown', (e) => {
      const keys = SHORTCUT.toLowerCase().split('+');
      const ctrl = keys.includes('ctrl') ? e.ctrlKey : true;
      const shift = keys.includes('shift') ? e.shiftKey : true;
      const alt = keys.includes('alt') ? e.altKey : true;
      const key = keys.find(k => !['ctrl', 'shift', 'alt'].includes(k));
      
      if (ctrl && shift && e.key.toLowerCase() === key) {
        e.preventDefault();
        toggle();
      }
    });
  }

  // Coverage overlay logic
  async function init() {
    if (!enabled) return;

    try {
      const response = await fetch(ENDPOINT);
      const data = await response.json();

      if (!data.success || !data.data) {
        console.warn('[Vue Coverage] No coverage data available');
        return;
      }

      cachedCoverageData = data.data;
      console.log('[Vue Coverage] ✅ Coverage loaded:', Object.keys(data.data).length, 'files');

      waitForVueAndSetupObserver();
    } catch (e) {
      console.warn('[Vue Coverage] Failed to fetch coverage:', e.message);
    }
  }

  function waitForVueAndSetupObserver() {
    let attempts = 0;

    const check = () => {
      attempts++;
      const components = scanAndApplyOverlays();

      if (components > 0) {
        console.log('[Vue Coverage] ✅ Overlays applied to', components, 'components');
        setupMutationObserver();
      } else if (attempts < 30) {
        setTimeout(check, 300);
      } else {
        setupMutationObserver();
      }
    };

    setTimeout(check, 500);
  }

  function setupMutationObserver() {
    if (observer) return;

    observer = new MutationObserver((mutations) => {
      let hasNewElements = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          hasNewElements = true;
          break;
        }
      }

      if (hasNewElements) {
        if (updateTimeout) clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
          scanAndApplyOverlays();
        }, 100);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function scanAndApplyOverlays() {
    if (!cachedCoverageData || !enabled) return 0;

    cleanupStaleOverlays();
    const components = scanDOMForVueComponents();
    if (components.length > 0) {
      applyOverlays(components, cachedCoverageData);
    }
    return components.length;
  }

  function cleanupStaleOverlays() {
    const toRemove = [];
    overlayedElements.forEach((el) => {
      if (!document.body.contains(el)) {
        toRemove.push(el);
      }
    });
    toRemove.forEach((el) => overlayedElements.delete(el));
  }

  function scanDOMForVueComponents() {
    const components = [];
    const seen = new Set();

    document.querySelectorAll('*').forEach((el) => {
      const vueComponent = el.__vueParentComponent;

      if (vueComponent && !seen.has(el)) {
        seen.add(el);

        const file = vueComponent.type?.__file;
        const name = vueComponent.type?.__name || vueComponent.type?.name;

        if (file && !file.includes('node_modules')) {
          const componentName = file.split('/').pop()?.replace(/\\.(vue|ts|js)$/, '') || name || 'Unknown';
          components.push({ element: el, name: componentName, file: file });
        }
      }
    });

    return components;
  }

  function findCoverage(data, componentName) {
    for (const [path, cov] of Object.entries(data)) {
      const fileName = path.split('/').pop()?.replace(/\\.(vue|ts|js)$/, '');
      if (fileName === componentName || path.includes(componentName)) {
        const statements = Object.values(cov.s || {});
        if (statements.length === 0) return 0;
        const covered = statements.filter((n) => n > 0).length;
        return (covered / statements.length) * 100;
      }
    }
    return null;
  }

  function applyOverlays(components, coverageData) {
    if (!document.getElementById('vue-cov-styles')) {
      const style = document.createElement('style');
      style.id = 'vue-cov-styles';
      style.textContent = \`
        .vue-cov-overlay {
          outline: 3px solid var(--vue-cov-color) !important;
          outline-offset: 2px !important;
          position: relative !important;
        }
        .vue-cov-overlay::after {
          content: attr(data-vue-cov) !important;
          position: absolute !important;
          top: -10px !important;
          left: 0 !important;
          background: var(--vue-cov-color) !important;
          color: white !important;
          padding: 2px 6px !important;
          border-radius: 3px !important;
          font-size: 11px !important;
          font-weight: bold !important;
          font-family: monospace !important;
          z-index: 999999 !important;
          pointer-events: none !important;
        }
      \`;
      document.head.appendChild(style);
    }

    const matchedNames = new Set();

    for (const { element, name } of components) {
      if (element.classList.contains('vue-cov-overlay')) continue;
      if (matchedNames.has(name)) continue;

      const coverage = findCoverage(coverageData, name);
      if (coverage !== null) {
        matchedNames.add(name);
        const color = coverage >= 80 ? '#22c55e' : coverage >= 60 ? '#eab308' : coverage >= 40 ? '#f97316' : '#ef4444';

        element.classList.add('vue-cov-overlay');
        element.style.setProperty('--vue-cov-color', color);
        element.setAttribute('data-vue-cov', name + ': ' + coverage.toFixed(0) + '%');
        element.setAttribute('title', name + ': ' + coverage.toFixed(1) + '% coverage');
        overlayedElements.add(element);
      }
    }
  }

  function removeAllOverlays() {
    overlayedElements.forEach((el) => {
      el.classList.remove('vue-cov-overlay');
      el.style.removeProperty('--vue-cov-color');
      el.removeAttribute('data-vue-cov');
      el.removeAttribute('title');
    });
    overlayedElements.clear();

    if (observer) {
      observer.disconnect();
      observer = null;
    }

    const style = document.getElementById('vue-cov-styles');
    if (style) style.remove();

    cachedCoverageData = null;
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createToggleButton();
      setupShortcut();
      if (enabled) init();
    });
  } else {
    createToggleButton();
    setupShortcut();
    if (enabled) init();
  }
})();
`
}

export function vueCoverageOverlay(options: VueCoverageOverlayOptions = {}): Plugin {
  const {
    coveragePath = 'coverage/coverage-final.json',
    endpoint = '/__coverage',
    shortcut = 'ctrl+shift+c',
    enabledByDefault = false,
  } = options

  const clientScriptPath = '/__coverage-overlay-client.js'
  let server: ViteDevServer

  return {
    name: 'vite-plugin-vue-coverage-overlay',

    configureServer(devServer) {
      server = devServer

      // Serve the client script
      devServer.middlewares.use((req, res, next) => {
        if (req.url === clientScriptPath) {
          res.setHeader('Content-Type', 'application/javascript')
          res.end(generateClientScript(endpoint, shortcut, enabledByDefault))
          return
        }
        next()
      })

      // Serve coverage data at endpoint
      devServer.middlewares.use(async (req, res, next) => {
        if (req.url !== endpoint) {
          return next()
        }

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method !== 'GET') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        try {
          const coverageFilePath = resolve(server.config.root, coveragePath)
          const coverageData = await readFile(coverageFilePath, 'utf-8')
          const coverage = JSON.parse(coverageData)

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              success: true,
              timestamp: new Date().toISOString(),
              data: coverage,
            }),
          )
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'

          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              success: false,
              error: 'Coverage data not available',
              message: errorMessage,
              hint: 'Run tests with coverage first: pnpm test:coverage',
            }),
          )
        }
      })

      // Inject script tag into HTML responses
      devServer.middlewares.use((req, res, next) => {
        // Only process HTML requests (not assets, API calls, etc.)
        const url = req.url || ''
        if (url.includes('.') && !url.endsWith('.html')) {
          return next()
        }
        if (url.startsWith('/__') || url.startsWith('/@') || url.startsWith('/node_modules')) {
          return next()
        }

        // Intercept the response
        const _originalWrite = res.write.bind(res)
        const originalEnd = res.end.bind(res)
        let body = ''

        res.write = function (chunk: any, ...args: any[]) {
          if (chunk) {
            body += typeof chunk === 'string' ? chunk : chunk.toString()
          }
          return true
        }

        res.end = function (chunk?: any, ...args: any[]) {
          if (chunk) {
            body += typeof chunk === 'string' ? chunk : chunk.toString()
          }

          // Only inject into HTML responses
          const contentType = res.getHeader('content-type')
          if (
            contentType &&
            String(contentType).includes('text/html') &&
            body.includes('</body>')
          ) {
            const scriptTag = `<script src="${clientScriptPath}"></script>`
            body = body.replace('</body>', `${scriptTag}</body>`)

            // Update content-length header
            res.setHeader('content-length', Buffer.byteLength(body))
          }

          return originalEnd(body)
        }

        next()
      })
    },
  }
}

export default vueCoverageOverlay
