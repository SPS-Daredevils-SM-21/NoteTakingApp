package com.google.sps.servlets;

import com.google.api.client.auth.oauth2.AuthorizationCodeFlow;
import com.google.api.client.auth.oauth2.AuthorizationCodeResponseUrl;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.servlet.auth.oauth2.AbstractAuthorizationCodeCallbackServlet;
import com.google.api.client.http.GenericUrl;
import com.google.sps.OAuthUtils;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/login-callback")
public class LoginCallbackServlet extends AbstractAuthorizationCodeCallbackServlet {

  @Override
  protected AuthorizationCodeFlow initializeFlow() throws IOException {
    return OAuthUtils.newFlow();
  }

  @Override
  protected String getRedirectUri(final HttpServletRequest request) {
        final GenericUrl url = new GenericUrl(request.getRequestURL().toString());
        url.setRawPath("/login-callback");
        return url.build();

        // The return is hard-coded until we find the best solution cloudshell dev 
        //return "https://8080-cs-1096873526294-default.cs-us-central1-pits.cloudshell.dev/login-callback";
    }

    @Override
    protected String getUserId(final HttpServletRequest request) {
        return request.getSession().getId();
    }

    @Override
    protected void onSuccess(final HttpServletRequest request, final HttpServletResponse response,
        final Credential credential) throws IOException {
          response.sendRedirect("/Notes.html");
    }

    @Override
    protected void onError(final HttpServletRequest request, final HttpServletResponse response,
            final AuthorizationCodeResponseUrl errorResponse)
      throws IOException {
    response.getWriter().print("Login cancelled.");
  }
}