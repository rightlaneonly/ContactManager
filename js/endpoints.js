var url = "http://localhost:8002/";
//var apiURL = "http://localhost:8000/APIs/CRUD";
// var url = "https://stirup.com/";
var apiURL = "https://stirup.co/API"

var info = "";
var userId = 0;
var curr_card;
var curr_image;
var curr_info;
var firstName = "";
var lastName = "";

//    Sign In UI -> Create Account UI
function needAccount()
{
    console.log(url + "signup.php");
    document.location = url + "signup.php";
}

//    Create Account UI -> Sign In UI
function hasAccount()
{
    document.location = url + "login.php";
}

// Allows the User to Log into their account 
// Allows the User to Log into their account 
function doLogin(ext)
{
    var alert = document.getElementById("alert-" +ext);
    alert.innerHTML="";
    
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
    var tmp = {login: login,password:password};
//	var tmp = {login:login,password:hash};
	var jsonPayload = JSON.stringify( tmp );
	
	var loc = url + "API/Login.php";
    console.log(loc);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", loc, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
            console.log("Making API Request");
			if (this.readyState == 4 && this.status == 200) 
			{
                console.log(xhr.responseText);
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
                console.log(userId)
				if( userId < 1 || userId === undefined)
				{	
                 
                    console.log("Finish API Request");
                    alert.innerHTML="User / Password Information Incorrect";
					return;
				}
                console.log("Finish API Request");
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();
        
        // If the credentials are correct allow the user to be logged in
        // and access the contact page
        console.log("User: " + login + "Found, Logging in...");
        document.location = url + "contact.php";
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
    var alert = document.getElementById("alert-" +ext);
    alert.innerHTML="";
    // Get all the neccessary values
    
    var firstName = document.getElementById("firstname-"+ ext).value;
    var lastName = document.getElementById("lastname-" + ext).value;
    var username = document.getElementById("username-"+ ext).value;
    var password = document.getElementById("password-" + ext).value;
    var password_confirm = document.getElementById("password-confirm-"+ext);
    var number = document.getElementById("number-" + ext).value;
    
    
    document.getElementById("firstname-" + ext).innerHTML = "";
    document.getElementById("lastname-" + ext).innerHTML = "";
    document.getElementById("username-" + ext).innerHTML = "";
    document.getElementById("password-" + ext).innerHTML = "";
    document.getElementById("password-confirm-" + ext).innerHTML = "";
    document.getElementById("number-" + ext).innerHTML = "";

    // if (password_confirm != password)
    // {
    //     console.log("passwords do not match");
    //     alert.innerHTML = "Passwords do not match";
    //     return;
    // }

    // Check that the login credentials are correct
    
    // Check that the login credentials are correct
    var tmp = {firstName: firstName, lastName: lastName, login: username,password:password};
//	var tmp = {login:login,password:hash};
	var jsonPayload = JSON.stringify( tmp );
	
	var loc = url + "APIs/CRUD/register.php";
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
                info = jsonObject;
                console.log("response", jsonObject);
				userId = jsonObject.id;
                console.log("id",userId)
				if( userId < 1 || userId === undefined)
				{	
                    alert.innerHTML = "Cannot find a match for the given password or username";
                    console.log("User / Password Information Incorrect")
					return;
				}
		
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

        saveCookie();
        // If the credentials are correct allow the user to be logged in
        // and access the contact page
        console.log("User: " + login + "Found, Logging in...");
        document.location = url + "contact.php";
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            console.log(err.message);
        }
}

function doLogOut()
{

}

function doForgotPassword()
{

}

// The code is in the notes - Ellie 
function searchContacts()
{
    var search = document.getElementById("search").value;
    document.getElementById('search').innerHTML = "";

    document.getElementById('contact-list').innerHTML = "";
    var contactList = "";

    var tmp = {search:search,userId:userId};
	var jsonPayload = JSON.stringify( tmp );

    // var loc = url + "APIs/CRUD/register.php";
}
function GetElementInsideContainer(event, childID) {
    var elm = {};
    var elms = event.getElementsByTagName("*");
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].id === childID) {
            elm = elms[i];
            break;
        }
    }
    return elm;
}

function showEditContact(event)
{
    if (event.id !== "contact-card")
        return;
    console.log(GetElementInsideContainer(event, "contact-image"));
    console.log("tst",document.getElementsByClassName(event.className));

    var image = GetElementInsideContainer(event, "contact-image");
    var initials = GetElementInsideContainer(image, "initials");

    var info = GetElementInsideContainer(event, "user-information");
    var name = GetElementInsideContainer(info, "user-name").innerHTML;
    var name_seperated = name.split(" ");
    var phone = GetElementInsideContainer(info, "phone").className;
    phone = phone.replace('(')
    var email = GetElementInsideContainer(info, "email").className;

    curr_card = event;
    curr_image = image;
    curr_info = info;

    if (event.id !== "contact-card")
        return;
    
    var parent = document.createElement('div');
    parent.id = "add-contact-div";
    parent.className = "modify-div";

    var inner = document.createElement("div");
    inner.id = "add-contact-form";
    inner.className = 'center-div';
    inner.innerHTML = '<div id="card"><div id="contact-image-big"><text id="initials">' + initials.innerHTML + '</text></div><div class="form" id="first-add"><label for="first-">First Name</label><input id="first-name" type="text" value="' + name_seperated[0] + '" placeholder="John" name="name"></div><div class="form"><label for="last-add">Last Name</label><input id="last-add" type="text" value="' + name_seperated[1] + '" placeholder="Doe" name="name"></div><div class="form"><label for="number-add">Phone Number</label><input id="number-add type="text" value="' + phone + '" placeholder="555-555-5555" name="number"></div><div class="form"><label for="email-add">Email</label><input id="email-add" type="text" value="' + email + '" placeholder="email@domain.com" name="email"></div><div id="modify-buttons"><button id="save" onclick="editContact()"> Save </button><button id="delete" onclick="deleteContact()"> Delete </button></div><button id="exit" onclick="hideEditContact()"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2.01429L17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429Z" fill="#919191"/></svg></div></div>';

    parent.appendChild(inner);

   
    
    var loc = document.getElementById("action-div");
    loc.appendChild(parent);
    loc.style.display = "block";
}


function deleteContact()
{
    if (curr_card === null || curr_info === null || curr_image === null)
        return;
    curr_card.style.display = "none";
    curr_card = null;
    curr_image = null;
    curr_info = null;
    hideEditContact();
}

function editContact()
{
    if (curr_card === null || curr_info === null || curr_image === null)
        return;
    var form_tmp = document.getElementById('add-contact-form');

    var form = GetElementInsideContainer(form_tmp, "card");
    


    
    
    console.log("kids", form.children);
    


    // var firstName = "11";

    // console.log("name", name);
    // var lastName = GetElementInsideContainer(form, "last-add").value;
    // var phoneNumber = GetElementInsideContainer(form, "number-add").value;
    // var useremail =GetElementInsideContainer(form, "email-add").value;

    var firstName = "f-changed";
    var lastName = "l-changed";
    var phoneNumber = '111111111';
    var userEmail = 'e-changed';

    var card = curr_card;
    card.innerHTML = "";
    
    var cardImage = document.createElement('div');
    cardImage.id = "contact-image";
    cardImage.className = "contact-" + phoneNumber;

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
    phone.id = "phone";
    phone.className = phoneNumber;
    phone.href="tel:+" + phoneNumber;
    phone.innerHTML = "Phone: " + "(" + phoneNumber.slice(0,3) + ")"  + phoneNumber.slice(3,6) + "-" + phoneNumber.slice(6);

    var email = document.createElement('a');
    email.id = "email";
    email.className=userEmail;
    email.href="mailto:" + userEmail;
    email.innerHTML = "Email: " + userEmail;

    user_information.appendChild(name);
    user_information.appendChild(phone);
    user_information.append(email);

    card.appendChild(user_information);
   
    
    // Reset the Global values
    curr_card = null;
    curr_image = null;
    curr_info = null;
    hideEditContact();
}

function showAddContact()
{
    var parent = document.createElement('div');
    parent.id = "add-contact-div";
    parent.className = "modify-div";

    var inner = document.createElement("div");
    inner.className = 'center-div';
    inner.innerHTML = '<div id="card"><div id="contact-image-big"><text id="initials"> ? </text></div><div class="form"><label for="first-add">First Name</label><input id="first-add" type="text" value="" placeholder="John" name="name"></div><div class="form"><label for="last-add">Last Name</label><input id="last-add" type="text" value="" placeholder="Doe" name="name"></div><div class="form"><label for="number-add">Phone Number</label><input id="number-add type="text" value="" placeholder="555-555-5555" name="number"></div><div class="form"><label for="email-add">Email</label><input id="email-add" type="text" value="" placeholder="email@domain.com" name="email"></div><button id="save" onclick="addContact()"> Save </button><button id="exit" onclick="hideAddContact()"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2.01429L17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429Z" fill="#919191"/></svg></div></div>';

    parent.appendChild(inner);
    

    var loc = document.getElementById("action-div");
    loc.appendChild(parent);
    loc.style.display = "block";
}

function hideEditContact()
{
    var action = document.getElementById("action-div");
    action.innerHTML = "";
    action.style.display = "none";
}
function hideAddContact()
{
    var action = document.getElementById("action-div");
    action.innerHTML = "";
    action.style.display = "none";
}
function addContact()
{
    
    console.log(document.getElementById("add-contact-div"));

    hideAddContact();
    var firstName = "vic";
    var lastName = "last";
    var phoneNumber = "555555555";
    var userEmail = "email@domain.com";
   
    
    var card = document.createElement('div');
    card.id = "contact-card";
    card.onclick = function (e)
    {
        console.log(e);
        showEditContact(e.target);
    }
    var cardImage = document.createElement('div');
    cardImage.id = "contact-image";
    cardImage.className = "contact-" + phoneNumber;

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
    phone.id = "phone";
    phone.className=phoneNumber;
    phone.href="tel:+" + phoneNumber;
    phone.innerHTML = "Phone: " + "(" + phoneNumber.slice(0,3) + ")"  + phoneNumber.slice(3,6) + "-" + phoneNumber.slice(6);

    var email = document.createElement('a');
    email.id = "email";
    email.className=userEmail;
    email.href="mailto:" + userEmail;
    email.innerHTML = "Email: " + userEmail;

    user_information.appendChild(name);
    user_information.appendChild(phone);
    user_information.append(email);

    card.appendChild(user_information);
    console.log(document.getElementById('action-div'));
    console.log(document.getElementById('contact-div'));
    var parent = document.getElementById('contact-div');
    console.log(parent);
    console.log(document.getElementsByClassName("contact-list"))
    var list = document.getElementById("contact-list");

    list.append(card);
    
}

// Vic
function pageLoad()
{
     
}
