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

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

/** Servlet responsible for creating new tasks. */
@WebServlet("/new-user")
public class AddNewUser extends HttpServlet {

  @Override
  public void doPost(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        // Sanitize user input to remove HTML tags and JavaScript.
        final String fname = Jsoup.clean(request.getParameter("fname"), Whitelist.none());
        final String lname = Jsoup.clean(request.getParameter("lname"), Whitelist.none());
        final String email = Jsoup.clean(request.getParameter("email"), Whitelist.none());
        final String psword = Jsoup.clean(request.getParameter("psword"), Whitelist.none());

        final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        final com.google.cloud.datastore.KeyFactory keyFactory = datastore.newKeyFactory().setKind("user");
        final FullEntity UserdB =
        Entity.newBuilder(keyFactory.newKey())
            .set("fname", fname)
            .set("lname", lname)
            .set("email", email)
            .set("psword", psword)
            .build();
    datastore.put(UserdB);
    response.sendRedirect("/signup.html");
  }
}