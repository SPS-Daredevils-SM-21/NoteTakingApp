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
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import com.google.sps.OAuthUtils;
import com.google.api.services.oauth2.model.Userinfo;
import com.google.cloud.datastore.StringValue;

/** Servlet responsible for creating new tasks. */
@WebServlet("/Create")
public class NewNoteServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String sessionId = request.getSession().getId();

    if(OAuthUtils.isUserLoggedIn(sessionId)){
      // Sanitize user input to remove HTML tags and JavaScript.
      String title = Jsoup.clean(request.getParameter("Name"), Whitelist.none());
      String text = Jsoup.clean(request.getParameter("Text"), Whitelist.none());
      Userinfo userInfo = OAuthUtils.getUserInfo(sessionId);
      String userId = userInfo.getId();
      long timestamp = System.currentTimeMillis();

      Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
      KeyFactory keyFactory = datastore.newKeyFactory().setKind("Note");
      FullEntity taskEntity =
          Entity.newBuilder(keyFactory.newKey())
              .set("title", title)
              .set("text", StringValue.newBuilder(text).setExcludeFromIndexes(true).build())
              .set("userID", userId)
              .set("timestamp", timestamp)
              .build();
      datastore.put(taskEntity);

      response.sendRedirect("/Notes.html");
    }else{
      response.sendRedirect("login");
    }
  }
}
