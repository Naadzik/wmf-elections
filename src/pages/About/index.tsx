import { useTranslation } from 'react-i18next';

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div className="py-5 border-b border-wmf-border last:border-0">
      <h2 className="text-base font-semibold text-wmf-text mb-2">{title}</h2>
      <p className="text-sm text-wmf-muted leading-relaxed">{body}</p>
    </div>
  );
}

const SECTION_KEYS = ['what', 'board', 'data', 'stv', 'methodology', 'source', 'contribute'] as const;

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-wmf-text">{t('about.title')}</h1>

      <div className="bg-white rounded-lg border border-wmf-border px-6">
        {SECTION_KEYS.map(k => (
          <Section key={k} title={t(`about.${k}_title`)} body={t(`about.${k}_body`)} />
        ))}
      </div>

      <div className="bg-wmf-blue/5 border border-wmf-blue/20 rounded-lg p-5 text-sm">
        <p className="text-wmf-blue font-medium mb-1">Data source</p>
        <a
          href="https://meta.wikimedia.org/wiki/Wikimedia_Foundation_elections"
          className="text-wmf-blue hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          meta.wikimedia.org/wiki/Wikimedia_Foundation_elections ↗
        </a>
        <p className="text-wmf-muted mt-2">CC BY-SA 4.0 · Wikimedia Foundation</p>
      </div>
    </div>
  );
}
