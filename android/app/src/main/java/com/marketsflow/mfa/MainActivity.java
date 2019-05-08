package com.marketsflow.mfa;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.support.v4.content.ContextCompat;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.RelativeLayout;

import com.reactnativenavigation.controllers.SplashActivity;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import
import android.os.Bundle;
public class MainActivity extends SplashActivity implements OnImagePickerPermissionsCallback {
    private PermissionListener listener; // <- add this attribute
    @Override
    public View createSplashLayout() {
        RelativeLayout splash = (RelativeLayout) findViewById(R.id.splashscreen);
        LayoutInflater inflater = (LayoutInflater) getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View view = inflater.inflate(R.layout.splash, null);
        return view;
    }

    @Override
    public void setPermissionListener(PermissionListener listener) {
        this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (listener != null) {
            listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}