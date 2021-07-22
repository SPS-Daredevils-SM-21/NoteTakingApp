package com.google.sps.servlets;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.oauth2.model.Userinfo;

import com.google.sps.OAuthUtils;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;

@WebServlet("/profile")
public class ProfileServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    response.setContentType("text/html;");
    String sessionId = request.getSession().getId();
    boolean isUserLoggedIn =
        OAuthUtils.isUserLoggedIn(sessionId);
    
    if (isUserLoggedIn) {
      Userinfo userInfo = OAuthUtils.getUserInfo(sessionId);
      
      response.getWriter().println(userInfo.getName());

    } else {
      response.sendRedirect("/login");	
    }
  }
}