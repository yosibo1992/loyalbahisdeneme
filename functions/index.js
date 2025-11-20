export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // Sadece ana sayfa için çalışsın
  if (url.pathname !== '/' && url.pathname !== '/index.html') {
    return context.next();
  }

  // Googlebot ve diğer crawler'lar
  const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool|googleweblight/i.test(userAgent);

  if (isGooglebot) {
    console.log('Googlebot detected – serving index.html');
    return context.next();
  }

  // Normal kullanıcıları tr.html'e yönlendir
  console.log('Normal user – redirecting to /tr.html');
  return Response.redirect(`${url.origin}/tr.html`, 302);
}
