const siteProps = {
  siteName: "Mensastické citáty",
  domain: "citaty.honbra.com",
};

export const initialPageProps = {
  description: "Citáty žáků a učitelů Mensa gymnázia",
  image: "",
};

export default function SeoTags(
  pageProps: Partial<Record<keyof typeof initialPageProps, string>>
) {
  pageProps = { ...initialPageProps, ...pageProps } as typeof initialPageProps;
  return (
    <>
      <title>
        {pageProps.description} | {siteProps.siteName}
      </title>
      <meta property="og:site_name" content={siteProps.siteName} />
      <meta name="description" content={pageProps.description} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={pageProps.description} />
      {pageProps.image ? (
        <meta property="og:image" content={pageProps.image} />
      ) : null}

      <meta property="twitter:domain" content={siteProps.domain} />
      {/* <meta property="twitter:card" content="summary_large_image" /> */}
      {/* <meta
        property="twitter:url"
        content={`https://${siteProps.domain}${router.route}`}
      /> */}
      <meta property="twitter:title" content={siteProps.siteName} />
      <meta property="twitter:description" content={pageProps.description} />
      {/* <meta property="twitter:image" content="/your-page-image.jpg" /> */}
    </>
  );
}
/*


<meta property="og:site_name" content="Your Website Name">
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/your-page-url">
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Your page description">
<meta property="og:image" content="/your-page-image.jpg">

<meta name="viewport" content="initial-scale=1, width=device-width" />

*/
