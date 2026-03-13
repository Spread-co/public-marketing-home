<template>
  <div v-if="!content.portalTarget || content.portalTarget === 'public'" class="mktg-home">

    <!-- ── LIVE SERVICE ALERTS ──────────────────────────────────────────── -->
    <div
      v-if="content.showLiveAlerts && visibleAlerts.length"
      class="mktg-home__alerts"
      role="status"
      aria-live="polite"
    >
      <div
        v-for="alert in visibleAlerts"
        :key="alert.id"
        class="mktg-home__alert"
        :class="`mktg-home__alert--${alert.severity || 'info'}`"
      >
        <div class="mktg-home__alert-content">
          <svg class="mktg-home__alert-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span class="mktg-home__alert-headline">{{ alert.headline }}</span>
          <span v-if="alert.body" class="mktg-home__alert-body">&nbsp;— {{ alert.body }}</span>
        </div>
        <button class="mktg-home__alert-dismiss" @click="dismissAlert(alert.id)" aria-label="Dismiss">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- ── HERO ─────────────────────────────────────────────────────────── -->
    <section class="mktg-home__hero">
      <div class="mktg-home__hero-content">
        <span class="mktg-home__eyebrow" v-if="content.heroEyebrow">{{ content.heroEyebrow }}</span>
        <h1 class="mktg-home__hero-headline" v-if="content.heroHeadline">{{ content.heroHeadline }}</h1>
        <p class="mktg-home__hero-sub" v-if="content.heroSubheadline">{{ content.heroSubheadline }}</p>

        <div class="mktg-home__hero-actions">
          <a
            v-if="content.heroPrimaryLabel"
            class="mktg-home__btn mktg-home__btn--primary"
            :href="content.heroPrimaryUrl || '/signin'"
            @click.prevent="heroCta('primary')"
          >{{ content.heroPrimaryLabel }}</a>
          <a
            v-if="content.heroSecondaryLabel"
            class="mktg-home__btn mktg-home__btn--secondary"
            :href="content.heroSecondaryUrl || '/about'"
            @click.prevent="heroCta('secondary')"
          >{{ content.heroSecondaryLabel }}</a>
        </div>

        <!-- Social proof inline -->
        <div class="mktg-home__hero-trust" v-if="content.showSocialProof">
          <div class="mktg-home__stars" aria-label="4.9 out of 5 stars">
            <svg v-for="i in 5" :key="i" viewBox="0 0 16 16" width="16" height="16" :fill="i <= 4 ? '#BEAD38' : 'none'" stroke="#BEAD38" stroke-width="1.5" aria-hidden="true"><polygon points="8 1 10.18 5.41 15 6.09 11.5 9.5 12.36 14.27 8 12 3.64 14.27 4.5 9.5 1 6.09 5.82 5.41 8 1"/></svg>
          </div>
          <span class="mktg-home__trust-text"><strong>{{ content.rating || '4.9' }}</strong> · {{ content.reviewCount || '2,400+' }} {{ content.socialProofText || 'households across Australia' }}</span>
        </div>
      </div>

      <div class="mktg-home__hero-media" v-if="content.heroImageUrl">
        <img :src="content.heroImageUrl" alt="Fresh produce delivery" class="mktg-home__hero-img" loading="eager" />
      </div>
    </section>

    <!-- ── VALUE PROPS ──────────────────────────────────────────────────── -->
    <section class="mktg-home__values" v-if="content.showValueProps && valueProps.length">
      <div class="mktg-home__section-inner">
        <h2 class="mktg-home__section-headline" v-if="content.valuePropHeadline">{{ content.valuePropHeadline }}</h2>
        <div class="mktg-home__values-grid">
          <article v-for="(vp, i) in valueProps" :key="i" class="mktg-home__value-card">
            <div class="mktg-home__value-icon" v-html="getIcon(vp.icon)" aria-hidden="true"></div>
            <h3 class="mktg-home__value-title">{{ vp.title }}</h3>
            <p class="mktg-home__value-body">{{ vp.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── HOW IT WORKS ─────────────────────────────────────────────────── -->
    <section class="mktg-home__how" v-if="content.showHowItWorks && steps.length">
      <div class="mktg-home__section-inner">
        <h2 class="mktg-home__section-headline" v-if="content.howHeadline">{{ content.howHeadline }}</h2>
        <div class="mktg-home__steps">
          <article v-for="(step, i) in steps" :key="i" class="mktg-home__step">
            <div class="mktg-home__step-number" aria-hidden="true">{{ step.number }}</div>
            <div class="mktg-home__step-connector" v-if="i < steps.length - 1" aria-hidden="true"></div>
            <h3 class="mktg-home__step-title">{{ step.title }}</h3>
            <p class="mktg-home__step-body">{{ step.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── BOTTOM CTA ───────────────────────────────────────────────────── -->
    <section class="mktg-home__cta" v-if="content.showBottomCta">
      <h2 class="mktg-home__cta-headline" v-if="content.bottomCtaHeadline">{{ content.bottomCtaHeadline }}</h2>
      <p class="mktg-home__cta-body" v-if="content.bottomCtaBody">{{ content.bottomCtaBody }}</p>
      <a
        v-if="content.bottomCtaLabel"
        class="mktg-home__btn mktg-home__btn--primary mktg-home__btn--large"
        :href="content.bottomCtaUrl || '/signin'"
        @click.prevent="$emit('trigger-event', { name: 'home:bottom-cta', event: {} })"
      >{{ content.bottomCtaLabel }}</a>
    </section>

  </div>
</template>

<script>
/* ── Inline Supabase helpers ─────────────────────────────────────────────── */
function createSpreadClient(url, anonKey) {
  const headers = { 'Content-Type': 'application/json', apikey: anonKey };
  return {
    from(table) {
      const q = {
        _cols: '*', _filters: [], _limit: null, _order: null,
        select(c) { this._cols = c; return this; },
        eq(col, val) { this._filters.push(`${col}=eq.${encodeURIComponent(val)}`); return this; },
        order(col, { ascending = true } = {}) { this._order = `${col}.${ascending ? 'asc' : 'desc'}`; return this; },
        limit(n) { this._limit = n; return this; },
        async then(resolve) {
          try {
            let qs = `${url}/rest/v1/${table}?select=${this._cols}`;
            if (this._filters.length) qs += '&' + this._filters.join('&');
            if (this._order) qs += `&order=${this._order}`;
            if (this._limit) qs += `&limit=${this._limit}`;
            const res = await fetch(qs, { headers });
            if (!res.ok) return resolve({ data: null, error: await res.json() });
            resolve({ data: await res.json(), error: null });
          } catch (e) { resolve({ data: null, error: e }); }
        },
      };
      return q;
    },
  };
}

function openRealtimeChannel(wsBase, anonKey, table, onPayload) {
  const wsUrl = `${wsBase}/realtime/v1/websocket?apikey=${anonKey}&vsn=1.0.0`;
  const topic = `realtime:public:${table}`;
  let ws, heartbeatId, reconnectId;
  function connect() {
    try {
      ws = new WebSocket(wsUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({ topic: 'phoenix', event: 'phx_join', payload: {}, ref: '0' }));
        ws.send(JSON.stringify({
          topic, event: 'phx_join',
          payload: { config: { broadcast: { self: false }, presence: { key: '' }, postgres_changes: [{ event: '*', schema: 'public', table }] } },
          ref: '1',
        }));
        heartbeatId = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ topic: 'phoenix', event: 'heartbeat', payload: {}, ref: '0' }));
        }, 25000);
      };
      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          if (msg.event === 'postgres_changes' && msg.payload?.data) onPayload(msg.payload.data);
        } catch (_) {}
      };
      ws.onclose = () => { clearInterval(heartbeatId); reconnectId = setTimeout(connect, 5000); };
      ws.onerror = () => { try { ws.close(); } catch (_) {} };
    } catch (_) {}
  }
  connect();
  return { close() { clearTimeout(reconnectId); clearInterval(heartbeatId); try { if (ws) ws.close(); } catch (_) {} } };
}

const VALUE_ICONS = {
  farm:     '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  price:    '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  eco:      '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22c0 0 6-8 14-8s6-14 6-14-14 0-14 14c0 0-2 4-6 8z"/></svg>',
  leaf:     '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22c0 0 6-8 14-8s6-14 6-14-14 0-14 14c0 0-2 4-6 8z"/></svg>',
  heart:    '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  star:     '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  default:  '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
};

export default {
  props: {
    /* wwEditor:start */
    wwEditorState:  { type: Object, required: true },
    /* wwEditor:end */
    content:        { type: Object, required: true },
    wwFrontState:   { type: Object, required: true },
    wwElementState: { type: Object, required: true },
  },

  emits: ['trigger-event'],

  data() {
    return {
      liveAlerts:       [],
      dismissedIds:     [],
      _pollTimer:       null,
      _realtimeChannel: null,
    };
  },

  mounted() {
    this._startAlerts();
  },

  beforeUnmount() {
    if (this._pollTimer)       clearInterval(this._pollTimer);
    if (this._realtimeChannel) this._realtimeChannel.close();
  },

  computed: {
    valueProps() {
      return Array.isArray(this.content.valueProps) ? this.content.valueProps : [];
    },
    steps() {
      return Array.isArray(this.content.steps) ? this.content.steps : [];
    },
    visibleAlerts() {
      return this.liveAlerts.filter(a => !this.dismissedIds.includes(a.id)).slice(0, 2);
    },
  },

  methods: {
    _startAlerts() {
      if (!this.content.showLiveAlerts) return;
      if (!this.content.supabaseUrl || !this.content.supabaseAnonKey) return;
      this._fetchAlerts();
      this._pollTimer = setInterval(() => this._fetchAlerts(), 60000);
      try {
        const wsBase = this.content.supabaseUrl.replace(/^https/, 'wss').replace(/^http/, 'ws');
        this._realtimeChannel = openRealtimeChannel(wsBase, this.content.supabaseAnonKey, 'service_alerts', (payload) => {
          if (payload.type === 'INSERT' || payload.type === 'UPDATE') {
            const r = payload.record;
            if (!r || !r.is_public || r.status !== 'sent') return;
            const idx = this.liveAlerts.findIndex(a => a.id === r.id);
            if (idx === -1) this.liveAlerts = [r, ...this.liveAlerts];
            else { const c = [...this.liveAlerts]; c[idx] = r; this.liveAlerts = c; }
          }
        });
      } catch (_) {}
    },

    async _fetchAlerts() {
      if (!this.content.supabaseUrl || !this.content.supabaseAnonKey) return;
      try {
        const client = createSpreadClient(this.content.supabaseUrl, this.content.supabaseAnonKey);
        const { data, error } = await client
          .from('service_alerts')
          .select('id,headline,body,severity,status,created_at')
          .eq('is_public', 'true')
          .eq('status', 'sent')
          .order('created_at', { ascending: false })
          .limit(5);
        if (!error && Array.isArray(data)) this.liveAlerts = data;
      } catch (_) {}
    },

    dismissAlert(alertId) {
      const alert = this.liveAlerts.find(a => a.id === alertId);
      this.dismissedIds = [...this.dismissedIds, alertId];
      this.$emit('trigger-event', { name: 'home:alert-dismissed', event: { alertId, headline: alert?.headline || '' } });
    },

    getIcon(name) {
      return VALUE_ICONS[name] || VALUE_ICONS.default;
    },

    heroCta(type) {
      const name = type === 'primary' ? 'home:hero-cta-primary' : 'home:hero-cta-secondary';
      this.$emit('trigger-event', { name, event: {} });
      try {
        const url = type === 'primary' ? this.content.heroPrimaryUrl : this.content.heroSecondaryUrl;
        if (url) {
          const win = typeof wwLib !== 'undefined' ? wwLib.getFrontWindow() : window;
          win.location.href = url;
        }
      } catch (_) {}
    },
  },
};
</script>

<style scoped>
/* ── Design tokens ───────────────────────────────────────────────────────── */
.mktg-home {
  --mh-primary:  #4B162D;
  --mh-accent:   #CE6632;
  --mh-accent-h: #B85A2B;
  --mh-gold:     #BEAD38;
  --mh-green:    #2E321E;
  --mh-beige:    #E6D8CA;
  --mh-text:     #1A1A1A;
  --mh-text-2:   #4B5563;
  --mh-surface:  #FFFFFF;
  --mh-bg:       #FBFAF8;
  --mh-bg-warm:  #F7EFE5;
  --mh-bg-dark:  #2E321E;
  --mh-border:   #EDE4D8;
  --mh-r-sm:     8px;
  --mh-r-md:     12px;
  --mh-r-lg:     20px;
  --mh-r-pill:   9999px;
  --mh-font:     'Work Sans', ui-sans-serif, system-ui, sans-serif;

  font-family: var(--mh-font);
  color: var(--mh-text);
  background: var(--mh-bg);
}

.mktg-home *, .mktg-home *::before, .mktg-home *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── Alerts ──────────────────────────────────────────────────────────────── */
.mktg-home__alerts { display: flex; flex-direction: column; }

.mktg-home__alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 20px;
  font-family: var(--mh-font);
  font-size: 13px;
  line-height: 1.5;
}

.mktg-home__alert--critical, .mktg-home__alert--outage { background: #FEF2F2; border-bottom: 1px solid #FECACA; color: #991B1B; }
.mktg-home__alert--warning, .mktg-home__alert--degraded { background: #FFFBEB; border-bottom: 1px solid #FDE68A; color: #92400E; }
.mktg-home__alert--info, .mktg-home__alert--maintenance { background: #EFF6FF; border-bottom: 1px solid #BFDBFE; color: #1E40AF; }

.mktg-home__alert-content { display: flex; align-items: flex-start; gap: 6px; flex: 1; min-width: 0; }
.mktg-home__alert-icon { flex-shrink: 0; margin-top: 1px; }
.mktg-home__alert-headline { font-weight: 600; }
.mktg-home__alert-body { opacity: 0.85; }
.mktg-home__alert-dismiss { flex-shrink: 0; background: none; border: none; cursor: pointer; color: currentColor; opacity: 0.6; padding: 4px; display: flex; border-radius: 4px; transition: opacity 0.15s; }
.mktg-home__alert-dismiss:hover { opacity: 1; }

/* ── Hero ────────────────────────────────────────────────────────────────── */
.mktg-home__hero {
  display: grid;
  gap: 40px;
  padding: 64px 20px 72px;
  max-width: 1100px;
  margin: 0 auto;
}

.mktg-home__eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mh-accent);
  background: rgba(206,102,50,0.1);
  padding: 4px 12px;
  border-radius: var(--mh-r-pill);
  margin-bottom: 16px;
}

.mktg-home__hero-headline {
  font-size: clamp(2rem, 5.5vw, 3.5rem);
  font-weight: 900;
  color: var(--mh-primary);
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  max-width: 640px;
}

.mktg-home__hero-sub {
  font-size: clamp(1rem, 2vw, 1.1875rem);
  color: var(--mh-text-2);
  line-height: 1.7;
  max-width: 560px;
  margin-bottom: 32px;
}

.mktg-home__hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
}

/* ── Buttons ─────────────────────────────────────────────────────────────── */
.mktg-home__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--mh-font);
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: var(--mh-r-pill);
  padding: 14px 28px;
  transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
  cursor: pointer;
  border: none;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.mktg-home__btn--primary {
  background: var(--mh-accent);
  color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(206,102,50,0.3);
}

.mktg-home__btn--primary:hover {
  background: var(--mh-accent-h);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(206,102,50,0.35);
}

.mktg-home__btn--secondary {
  background: transparent;
  color: var(--mh-primary);
  border: 2px solid var(--mh-primary);
}

.mktg-home__btn--secondary:hover {
  background: rgba(75,22,45,0.05);
}

.mktg-home__btn--large {
  font-size: 1.0625rem;
  padding: 16px 40px;
}

/* ── Trust / social proof ────────────────────────────────────────────────── */
.mktg-home__hero-trust {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--mh-text-2);
}

.mktg-home__stars {
  display: flex;
  gap: 2px;
}

.mktg-home__trust-text strong {
  color: var(--mh-text);
}

/* ── Hero media ──────────────────────────────────────────────────────────── */
.mktg-home__hero-media {
  display: flex;
  align-items: center;
}

.mktg-home__hero-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: var(--mh-r-lg);
}

@media (min-width: 768px) {
  .mktg-home__hero {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 80px 48px 88px;
  }
  .mktg-home__hero-img { height: 440px; }
}

@media (min-width: 1024px) {
  .mktg-home__hero { padding: 100px 64px 100px; column-gap: 80px; }
  .mktg-home__hero-img { height: 520px; }
}

/* ── Section common ──────────────────────────────────────────────────────── */
.mktg-home__section-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.mktg-home__section-headline {
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 800;
  color: var(--mh-primary);
  text-align: center;
  letter-spacing: -0.025em;
  margin-bottom: 40px;
}

/* ── Value props ─────────────────────────────────────────────────────────── */
.mktg-home__values {
  background: var(--mh-bg-warm);
  padding: 72px 20px;
}

.mktg-home__values-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.mktg-home__value-card {
  background: var(--mh-surface);
  border-radius: var(--mh-r-md);
  padding: 28px 24px;
  border: 1px solid var(--mh-border);
  transition: box-shadow 0.2s;
}

.mktg-home__value-card:hover {
  box-shadow: 0 4px 20px rgba(75,22,45,0.07);
}

.mktg-home__value-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(206,102,50,0.1);
  border-radius: var(--mh-r-sm);
  color: var(--mh-accent);
  margin-bottom: 16px;
}

.mktg-home__value-title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--mh-primary);
  margin-bottom: 8px;
}

.mktg-home__value-body {
  font-size: 0.9375rem;
  color: var(--mh-text-2);
  line-height: 1.65;
}

@media (min-width: 600px) {
  .mktg-home__values-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .mktg-home__values-grid { grid-template-columns: repeat(4, 1fr); }
  .mktg-home__values { padding: 88px 48px; }
}
@media (min-width: 1024px) {
  .mktg-home__values { padding: 96px 64px; }
}

/* ── How it works ────────────────────────────────────────────────────────── */
.mktg-home__how {
  padding: 72px 20px;
  background: var(--mh-bg);
}

.mktg-home__steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.mktg-home__step {
  position: relative;
  padding: 28px 24px;
  background: var(--mh-surface);
  border: 1px solid var(--mh-border);
  border-radius: var(--mh-r-md);
}

.mktg-home__step-number {
  width: 36px;
  height: 36px;
  background: var(--mh-primary);
  color: var(--mh-gold);
  border-radius: var(--mh-r-pill);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 800;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.mktg-home__step-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--mh-primary);
  margin-bottom: 6px;
}

.mktg-home__step-body {
  font-size: 0.9375rem;
  color: var(--mh-text-2);
  line-height: 1.65;
}

@media (min-width: 640px) {
  .mktg-home__steps { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .mktg-home__steps { grid-template-columns: repeat(4, 1fr); }
  .mktg-home__how { padding: 88px 48px; }
}
@media (min-width: 1024px) {
  .mktg-home__how { padding: 96px 64px; }
}

/* ── Bottom CTA ──────────────────────────────────────────────────────────── */
.mktg-home__cta {
  background: var(--mh-primary);
  padding: 72px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.mktg-home__cta-headline {
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 900;
  color: #FFFFFF;
  letter-spacing: -0.025em;
  line-height: 1.1;
  max-width: 580px;
}

.mktg-home__cta-body {
  font-size: 1.0625rem;
  color: rgba(255,255,255,0.75);
  max-width: 480px;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .mktg-home__cta { padding: 96px 48px; }
}
</style>
