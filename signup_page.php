
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Necessary Style Sheets -->
        <script src="/endpoints/endpoints.js"></script>
        <link rel="stylesheet" href="/components/create_account_mobile/create_account_mobile.css">
        <link rel="stylesheet" href="/components/sign_in_mobile/sign_in_mobile.css">
        <link rel="stylesheet" href="/components/user_auth_desktop/user_auth_desktop.css">
        <link rel="stylesheet" href="./pages/login_page/styles.css">
        <title>Welcome to Contact Manager</title>
    </head>
    <body>
    <div class="alert">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
  This is an alert box.
</div>
         <!-- Desktop user authentication UI breakpoint at 750px -->
         <div id="auth-desktop">
        <div id="content">
            <div id="auth">
            <div id="user-auth-card">
        <div id="card-sign-in">
       
            <text class="header"> Sign In</text>
            <div class="form">
                <label for="username-desktop">Email</label>
                <input id="username-desktop" type="text" value="" placeholder="email@domain.com" name="email">
              </div>
              <div class="form">
                <label for="password">Password</label>
                <input id="password-desktop" type="text" value="" placeholder="Password" name="name">
              </div>
              <div id="sign-in-btns">
                <button id="sign-in" onclick='doLogin("desktop")'> Sign In </button>
                <a style="font-size: smaller"> Forgot Password? </a> </text>
              </div>
            
    </div>

    <div id="card-sign-up">
        <text class="header" style="color: white;"> Create An Account</text>
        <div class="form">
            <label for="email">Email</label>
            <input id="username-desktop" type="text" value="" placeholder="email@domain.com" name="email">
          </div>
          <div class="form">
            <label for="password">Password</label>
            <input id="password-desktop" type="text" value="" placeholder="Password" name="name">
          </div>
          <div class="form">
            <label for="password">Confirm Password</label>
            <input id="password-check-desktop" type="text" value="" placeholder="Password" name="password">
          </div>
          <div class="form">
            <label for="number">Phone Number</label>
            <input id="number-desktop" type="text" value="" placeholder="555-555-5555" name="number">
          </div>
            <button id="sign-up"> Sign Up </button>
            
            
    </div>
    </div>
            </div>
        </div>
        </div>
    <!-- UI for mobile user authentication -->
    <div id="auth-mobile">
<div id="card-sign-up-mobile">
        <text class="header"> Create An Account</text>
        <div class="form">
            <label for="email">Email</label>
            <input id="email" type="text" value="" placeholder="email@domain.com" name="email">
          </div>
          <div class="form">
            <label for="password">Password</label>
            <input id="password" type="text" value="" placeholder="Password" name="name">
          </div>
          <div class="form">
            <label for="password">Confirm Password</label>
            <input id="password" type="text" value="" placeholder="Password" name="password">
          </div>
          <div class="form">
            <label for="number">Phone Number</label>
            <input id="number" type="text" value="" placeholder="555-555-5555" name="number">
          </div>
            <button id="sign-up-mobile" onclick="doSignUp('mobile')"> Sign Up </button>
            <text> Have an account? <button onclick="hasAccount()"> Sign In now</button> </text>
</div>  
</div>
    </body>
    </html>