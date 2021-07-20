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

package com.google.sps.data;

/**user-registration info attributes. */
public final class user{

  private final String fname;
  private final String lname;
  private final String email;
  private final String psword;

  public user(final String fname, final String lname, final String email, final String psword) {
    this.fname= fname;
    this.lname = lname;
    this.email = email;
    this.psword= psword; 
  }
}