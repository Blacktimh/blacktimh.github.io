// ─── Cookie Consent – DSGVO / TTDSG ─────────────────────────────────────────
function getCookieConsent(){
  try{ return localStorage.getItem('cookieConsent'); }catch(e){ return null; }
}

function setCookieConsent(val){
  try{ localStorage.setItem('cookieConsent', val); }catch(e){}
  document.getElementById('cookie-banner').style.display = 'none';
  if(val === 'accepted'){ loadGoogleMap(); }
}

// Beim Laden prüfen ob Banner angezeigt werden soll
(function(){
  if(!getCookieConsent()){
    document.getElementById('cookie-banner').style.display = 'flex';
  }
})();

// ─── Google Maps – erst nach Einwilligung laden ───────────────────────────────
function loadGoogleMap(){
  var consent = getCookieConsent();
  if(!consent){
    document.getElementById('cookie-banner').style.display = 'flex';
    return;
  }
  if(consent === 'rejected'){
    var ph = document.getElementById('maps-placeholder');
    if(ph){
      ph.innerHTML = '<p style="color:var(--muted);font-size:14px">Die Karte wurde nicht geladen, da Sie der Datenübertragung an Google nicht zugestimmt haben.<br><a href="datenschutz.html" style="color:var(--gold)">Datenschutzerklärung</a></p>';
    }
    return;
  }
  // Einwilligung vorhanden → Karte laden
  document.getElementById('maps-iframe').src =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.0!2d9.5347!3d54.1523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHauptstra%C3%9Fe+34%2C+25590+Osterstedt!5e0!3m2!1sde!2sde!4v1699000000000!5m2!1sde!2sde';
  document.getElementById('maps-placeholder').style.display = 'none';
  document.getElementById('maps-box').style.display = 'block';
}

// Wenn Einwilligung bereits erteilt wurde → Karte sofort laden
(function(){
  if(getCookieConsent() === 'accepted'){ loadGoogleMap(); }
})();
