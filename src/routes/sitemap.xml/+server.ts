const url = "https://www.byrdshuntingandfishing.com";
const last_major_update = "2025-02-22";

// auth, cms, and api routes are intentionally not included

export async function GET() {
  return new Response(
    `
    <?xml version="1.0" encoding="UTF-8" ?>
<urlset
	xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xhtml="https://www.w3.org/1999/xhtml"
	xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
	xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
	xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
	xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
	<url>
		<loc>${url}</loc>
		<lastmod>${last_major_update}</lastmod>
		<priority>1.0</priority>
	</url>
	<url>
		<loc>${url}/about_us</loc>
		<lastmod>${last_major_update}</lastmod>
		<priority>0.5</priority>
	</url>
	<url>
		<loc>${url}/contact</loc>
		<lastmod>${last_major_update}</lastmod>
		<priority>0.6</priority>
	</url>
	<url>
		<loc>${url}/fishing</loc>
		<lastmod>${last_major_update}</lastmod>
		<priority>0.8</priority>
	</url>
	<url>
		<loc>${url}/hunting</loc>
		<lastmod>${last_major_update}</lastmod>
		<priority>0.8</priority>
	</url>
	<url>
		<loc>${url}/the_cabin</loc>
		<lastmod>${last_major_update}</lastmod>
		<priority>0.7</priority>
	</url>
	
</urlset>
    `.trim(),
    {
      headers: {
        "Content-Type": "application/xml",
      },
    },
  );
}
