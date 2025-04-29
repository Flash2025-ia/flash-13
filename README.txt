
INSTRUCCIONES PARA APK CON FUNCIONALIDAD DE GPS + WHATSAPP

1. En AndroidManifest.xml agrega los permisos:

<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.INTERNET" />

2. En tu MainActivity.java configura así tu WebView:

webView.getSettings().setJavaScriptEnabled(true);
webView.getSettings().setGeolocationEnabled(true);
webView.setWebChromeClient(new WebChromeClient() {
    @Override
    public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
        callback.invoke(origin, true, false);
    }
});

3. Asegúrate de pedir permisos de ubicación en tiempo de ejecución si tu app es Android 6.0 (API 23) o superior.

¡Listo! Con eso funcionará el envío de ubicación y mensajes a WhatsApp desde tu APK.
