// Business Logic for AddressBook ---------
// This is a constructor for the database
function AddressBook() {
    this.contacts = [],
    this.currentId = 0
  }
  
  // The following four functions are prototype methods to the constructor
  AddressBook.prototype.addContact = function(contact) {
    contact.id = this.assignId();
    this.contacts.push(contact);
  }
  
  AddressBook.prototype.assignId = function() {
    this.currentId += 1;
    return this.currentId;
  }
  
  AddressBook.prototype.findContact = function(id) {
    for (var i=0; i< this.contacts.length; i++) {
      if (this.contacts[i]) {
        if (this.contacts[i].id == id) {
          return this.contacts[i];
        }
      }
    };
    return false;
  }
  
  AddressBook.prototype.deleteContact = function(id) {
    for (var i=0; i< this.contacts.length; i++) {
      if (this.contacts[i]) {
        if (this.contacts[i].id == id) {
          delete this.contacts[i];
          return true;
        }
      }
    };
    return false;
  }
  
  // Business Logic for Contacts ---------
  // This is a constructor
  function Contact(firstName, lastName, phoneNumber) {
    this.firstName = firstName,
    this.lastName = lastName,
    this.phoneNumber = phoneNumber
  }
  
  // This is a prototype method to the constructor
  Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
  }
  
  // User Interface Logic ---------
  // The first function shows contacts as they're being added to the address book (first and last name is visible)
  // For each contact, assign the variable htmlForContactInfo an html list element with an id, first name and last name. This Li will go into the empty ul element.
  var addressBook = new AddressBook();
  // here we created a new AddressBook object as a global variable
  
  function displayContactDetails(addressBookToDisplay) {
    var contactsList = $("ul#contacts");
    var htmlForContactInfo = "";
    addressBookToDisplay.contacts.forEach(function(contact) {
      htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
    });
    contactsList.html(htmlForContactInfo);
  };
  // The second function is for the event listener to show/hide the div with visible first and last name and phone number.
  function showContact(contactId) {
    var contact = addressBook.findContact(contactId);
    $("#show-contact").show();
    $(".first-name").html(contact.firstName);
    $(".last-name").html(contact.lastName);
    $(".phone-number").html(contact.phoneNumber);
    var buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
  }
  // The third function - the on method within this function takes two arguments, 1) click on parent ul element 2) click on child li element
  // the click on the parent ul element is delegated to its child li elements, or the li click event bubbles up to the parent.
  // after submitting the form this will show first and last,when you click the li element you get first and last name and phone number returned.
  // the parent element 
  function attachContactListeners() {
    $("ul#contacts").on("click", "li", function() {
     showContact(this.id);
         //show contact method passes this.id as an argument and returns an id based on the findContact prototype method
    });
    $("#buttons").on("click", ".deleteButton", function() {
        addressBook.deleteContact(this.id);
        $("#show-contact").hide();
        displayContactDetails(addressBook);
      });
  };


  $(document).ready(function() {
      attachContactListeners();
    $("form#new-contact").submit(function(event) {
      event.preventDefault();
      var inputtedFirstName = $("input#new-first-name").val();
      var inputtedLastName = $("input#new-last-name").val();
      var inputtedPhoneNumber = $("input#new-phone-number").val();
      
      $("input#new-first-name").val("");
      $("input#new-last-name").val("");
      $("input#new-phone-number").val("");

      var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
      addressBook.addContact(newContact);
      displayContactDetails(addressBook);
    })
  })