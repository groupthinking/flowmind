import PlausibleProvider from 'next-plausible';

export default function App({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="yourdomain.com">
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}