package com.martinaecc.tests;

import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.webkit.WebView;
import android.widget.FrameLayout;
import android.widget.TextView;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.WebViewListener;

public class MainActivity extends BridgeActivity {

    private TextView backButton;
    private OnBackPressedCallback backCallback;

    private final WebViewListener navigationListener = new WebViewListener() {
        @Override
        public void onPageStarted(WebView webView) {
            refreshBackUi(webView);
        }

        @Override
        public void onPageLoaded(WebView webView) {
            refreshBackUi(webView);
        }

        @Override
        public void onPageCommitVisible(WebView webView, String url) {
            refreshBackUi(webView);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (bridge == null) {
            return;
        }

        installNativeBackButton();
        installBackHandler();
        bridge.addWebViewListener(navigationListener);
        refreshBackUi(bridge.getWebView());
    }

    @Override
    public void onDestroy() {
        if (bridge != null) {
            bridge.removeWebViewListener(navigationListener);
        }
        super.onDestroy();
    }

    private void installBackHandler() {
        backCallback = new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                handleBackNavigation();
            }
        };
        getOnBackPressedDispatcher().addCallback(this, backCallback);
    }

    private void installNativeBackButton() {
        FrameLayout root = findViewById(android.R.id.content);
        if (root == null) {
            return;
        }

        backButton = new TextView(this);
        backButton.setText("<- 返回");
        backButton.setTextColor(Color.WHITE);
        backButton.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        backButton.setPadding(dp(18), dp(10), dp(18), dp(10));
        backButton.setGravity(Gravity.CENTER);
        backButton.setClickable(true);
        backButton.setFocusable(true);
        backButton.setVisibility(View.GONE);

        GradientDrawable background = new GradientDrawable();
        background.setColor(Color.parseColor("#CC111827"));
        background.setCornerRadius(dp(24));
        backButton.setBackground(background);
        backButton.setElevation(dp(6));

        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.WRAP_CONTENT,
            FrameLayout.LayoutParams.WRAP_CONTENT
        );
        params.gravity = Gravity.END | Gravity.BOTTOM;
        params.setMargins(dp(16), dp(16), dp(16), dp(96));

        backButton.setLayoutParams(params);
        backButton.setOnClickListener(v -> handleBackNavigation());
        root.addView(backButton);
    }

    private void handleBackNavigation() {
        WebView webView = bridge != null ? bridge.getWebView() : null;
        if (webView == null) {
            fallThroughBack();
            return;
        }

        if (webView.canGoBack()) {
            webView.goBack();
            refreshBackUi(webView);
            return;
        }

        if (isExternalPage(webView.getUrl())) {
            webView.loadUrl(bridge.getAppUrl());
            refreshBackUi(webView);
            return;
        }

        fallThroughBack();
    }

    private void fallThroughBack() {
        if (backCallback != null) {
            backCallback.setEnabled(false);
        }
        getOnBackPressedDispatcher().onBackPressed();
        if (backCallback != null) {
            backCallback.setEnabled(true);
        }
    }

    private void refreshBackUi(WebView webView) {
        if (backButton == null || webView == null) {
            return;
        }

        webView.post(() -> {
            boolean showBack = webView.canGoBack() || isExternalPage(webView.getUrl());
            backButton.setVisibility(showBack ? View.VISIBLE : View.GONE);
        });
    }

    private boolean isExternalPage(String url) {
        if (url == null || bridge == null) {
            return false;
        }

        Uri currentUri = Uri.parse(url);
        Uri appUri = Uri.parse(bridge.getAppUrl());
        String currentHost = currentUri.getHost();
        String appHost = appUri.getHost();
        String currentScheme = currentUri.getScheme();
        String appScheme = appUri.getScheme();

        return !safeEquals(currentHost, appHost) || !safeEquals(currentScheme, appScheme);
    }

    private boolean safeEquals(String left, String right) {
        return left == null ? right == null : left.equals(right);
    }

    private int dp(int value) {
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, value, getResources().getDisplayMetrics()));
    }
}
