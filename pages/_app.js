import Head from 'next/head';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Bereme se!</title>
      <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
