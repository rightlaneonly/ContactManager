// function doAction()
// {
	
// 	// Get the values for the HTML

// 	// Create the JS object to send to the PHP and convert it to JSON
// 	var obj = 
// 	{	

// 	};

// 	var input = JSON.stringify();
	
// 	// Open up a new Request
// 	var url = urlBase + '<FileName>' + extension;
// 	var xhr = new XMLHttpRequest();
// 	xhr.open("POST", url, true);
// 	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

// 	// Send the Request 
// 	try
// 	{
// 		xhr.onreadystatechange = function() 
// 		{
// 			// If the request is valid :
// 			if (this.readyState == 4 && this.status == 200) 
// 			{
// 				// Get the response
// 				var jsonObject = JSON.parse( xhr.responseText);
				
				

// 				saveCookie();
	
// 			}
// 		};
// 		xhr.send(jsonPayload);
// 	}
// 	// If the request is invalid:
// 	catch(err)
// 	{
		
// 	}
// 	// Any aditional actions that need to happen after the process is complete: 
	
// }

var url = "http://localhost:8000/";
var apiURL = "http://localhost:8000/APIs/CRUD";
// var url = "http://stirup.com/";

var userId = 0;
var firstName = "";
var lastName = "";

//    Sign In UI -> Create Account UI
function needAccount()
{
    console.log(url + "signup_page.php");
    document.location = url + "signup_page.php";
    
}
//    Create Account UI -> Sign In UI
function hasAccount()
{
    document.location = url + "login_page.php";
}
// Allows the User to Log into their account 
// Allows the User to Log into their account 
function doLogin(ext)
{
    console.log("doLogin()");
    // Reset all variables to default setting 
    userId = 0;
	firstName = "";
	lastName = "";

    console.log("Document Location ", document.location);
    // Get all the neccessary values
    var login = document.getElementById("username-"+ ext).value;
    var password = document.getElementById("password-" + ext).value;

    document.getElementById("username-" + ext).innerHTML = "";
    document.getElementById("password-" + ext).innerHTML = "";

    // Check that the login credentials are correct
    var tmp = {login:"tst",password:"tst"};
//	var tmp = {login:login,password:hash};
	var jsonPayload = JSON.stringify( tmp );
	
	var loc = url + "APIs/CRUD/login.php";
    console.log(loc);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", loc, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
                console.log(userId)
				if( userId < 1 || userId === undefined)
				{	console.log(userId,"User / Password Information Incorrect")
					return;
				}
		
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();
        // If the credentials are correct allow the user to be logged in
        // and access the contact page
        console.log("User: " + login + "Found, Logging in...");
        document.location = url + "contact_page.php";
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            console.log(err.message);
        }

  
}
function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}


function doSignUp(ext)
{
    console.log("Document Location ", document.location);
    // Get all the neccessary values
    
   
    // var username = document.getElementById("username-"+ ext).value;
    // var password = document.getElementById("password-" + ext).value;
    // var number = document.getElementById("number-" + ext).value;
    
    // document.getElementById("username-" + ext).innerHTML = "";
    // document.getElementById("password-" + ext).innerHTML = "";
    // document.getElementById("number-" + ext).innerHTML = "";

    // Check that the login credentials are correct
    
    // Check that the login credentials are correct
    var tmp = {firstName: "V", lastName: "W", login: "tst",password:"tst"};
//	var tmp = {login:login,password:hash};
	var jsonPayload = JSON.stringify( tmp );
	
	var loc = url + "APIs/CRUD/register.php";
    console.log(loc);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", loc, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
                console.log("id",userId)
				if( userId < 1 || userId === undefined)
				{	console.log("User / Password Information Incorrect")
					return;
				}
		
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();
        // If the credentials are correct allow the user to be logged in
        // and access the contact page
        // console.log("User: " + login + "Found, Logging in...");
        // document.location = url + "contact_page.php";
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            console.log(err.message);
        }
    // If the credentials are correct allow the user to be logged in
    // and access the contact page
   
    document.location = url + "contact_page.php";
}

function doLogOut()
{

}

function doForgotPassword()
{

}
function searchContacts()
{

}

function editContact()
{

}

function deleteContact()
{

}

function addContact(firstName,lastName,phoneNumber,userEmail)
{
    var card = document.createElement('div');
    card.id = "contact-card";

    var cardImage = document.createElement('div');
    cardImage.id = "contact-image";

    var initials = document.createElement('text');
    initials.id = "initials";
    initials.innerHTML = firstName.charAt(0) + lastName.charAt(0);

    cardImage.appendChild(initials);
    card.appendChild(cardImage);

    var user_information = document.createElement('div');
    user_information.id = "user-information";

    var name = document.createElement('text');
    name.id = "user-name";
    name.innerHTML = firstName + " " + lastName;

    var phone = document.createElement('a');
    phone.className="info";
    phone.href="tel:+" + phoneNumber;
    phone.innerHTML = "Phone: " + "(" + phoneNumber.slice(0,3) + ")"  + phoneNumber.slice(3,6) + "-" + phoneNumber.slice(6);

    var email = document.createElement('a');
    email.className="info";
    email.href="mailto:" + userEmail;
    email.innerHTML = "Email: " + userEmail;

    user_information.appendChild(name);
    user_information.appendChild(phone);
    user_information.append(email);

    card.appendChild(user_information);



    var list = document.getElementById("contact-list");
    list.append(card);
}

function pageLoad()
{
     
}