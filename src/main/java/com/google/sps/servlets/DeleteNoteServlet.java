// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.KeyFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.sps.OAuthUtils;
import com.google.api.services.oauth2.model.Userinfo;

/** Servlet responsible for deleting tasks. */
@WebServlet("/delete-note")
public class DeleteNoteServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String sessionId = request.getSession().getId();

    if(OAuthUtils.isUserLoggedIn(sessionId)){
      Userinfo userInfo = OAuthUtils.getUserInfo(sessionId);
      String userId = userInfo.getId();

      long id = Long.parseLong(request.getParameter("id"));
      String owner = request.getParameter("owner");

      if(userId.equals(owner)){
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        KeyFactory keyFactory = datastore.newKeyFactory().setKind("Note");
        Key taskEntityKey = keyFactory.newKey(id);
        datastore.delete(taskEntityKey);
      }else{
        response.sendError(403);
        System.out.println("Didn't Errase");
      }
      
    }else{
      response.sendRedirect("/login");
    }
  }
}
