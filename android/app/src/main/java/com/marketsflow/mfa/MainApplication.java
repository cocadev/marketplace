package com.marketsflow.mfa;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactPackage;
import com.RNTextInputMask.RNTextInputMaskPackage;
import java.util.Arrays;
import java.util.List;
import io.sentry.RNSentryPackage;

public class MainApplication extends NavigationApplication  {
@Override
    public boolean isDebug() {
      return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
      new VectorIconsPackage(),
      new ImagePickerPackage(),
      new ImageResizerPackage(),
      new RNTextInputMaskPackage(),
       new RNSentryPackage()
      );
    }

    @Override
    public String getJSMainModuleName() {
      return "index";
    }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
}
