export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // SADECE ANA SAYFA
  if (url.pathname !== '/' && url.pathname !== '/index.html') {
    return context.next();
  }

  // GOOGLEBOT KONTROLÜ (KESİN!)
  const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool/i.test(userAgent);

  // GOOGLEBOT İSE → index.html göster (SEO için)
  if (isGooglebot) {
    console.log('Googlebot detected – serving index.html');
    return context.next();
  }

  // NORMAL KULLANICILAR → tr.html'e yönlendir
  console.log('Normal user – redirecting to tr.html');
  return Response.redirect(${url.origin}/tr.html, 302);
}
