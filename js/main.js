

  




















(function() {
	function validEmail(email) {
	  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	  return re.test(email);
	}
  
	function validateHuman(honeypot) {
	  if (honeypot) {  //if hidden form filled up
		console.log("Robot Detected!");
		return true;
	  } else {
		console.log("Welcome Human!");
	  }
	}
  
	// get all data in form and return object
	function getFormData(form) {
	  var elements = form.elements;
  
	  var fields = Object.keys(elements).filter(function(k) {
			return (elements[k].name !== "honeypot");
	  }).map(function(k) {
		if(elements[k].name !== undefined) {
		  return elements[k].name;
		// special case for Edge's html collection
		}else if(elements[k].length > 0){
		  return elements[k].item(0).name;
		}
	  }).filter(function(item, pos, self) {
		return self.indexOf(item) == pos && item;
	  });
  
	  var formData = {};
	  fields.forEach(function(name){
		var element = elements[name];
		
		// singular form elements just have one value
		formData[name] = element.value;
  
		// when our element has multiple items, get their values
		if (element.length) {
		  var data = [];
		  for (var i = 0; i < element.length; i++) {
			var item = element.item(i);
			if (item.checked || item.selected) {
			  data.push(item.value);
			}
		  }
		  formData[name] = data.join(', ');
		}
	  });
  
	  // add form-specific values into the data
	  formData.formDataNameOrder = JSON.stringify(fields);
	  formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
	  formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
  
	  
	  return formData;
	}
  
	function handleFormSubmit(event) {  // handles form submit without any jquery
	  event.preventDefault();           // we are submitting via xhr below
	  var form = event.target;
	  var data = getFormData(form);         // get the values submitted in the form
  
	  /* OPTION: Remove this comment to enable SPAM prevention, see README.md
	  if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
		return false;
	  }
	  */
  
	  if( data.email && !validEmail(data.email) ) {   // if email is not valid show error
		var invalidEmail = form.querySelector(".email-invalid");
		if (invalidEmail) {
		  invalidEmail.style.display = "block";
		  return false;
		}
	  } else {
		disableAllButtons(form);
		var url = form.action;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		// xhr.withCredentials = true;
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function() {
			
			var formElements = form.querySelector(".form-elements")
			if (formElements) {
			  formElements.style.display = "none"; // hide form
			}
			var thankYouMessage = form.querySelector(".thankyou_message");
			if (thankYouMessage) {
			  thankYouMessage.style.display = "block";
			}
			return;
		};
		// url encode form data for sending as post data
		var encoded = Object.keys(data).map(function(k) {
			return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
		}).join('&');
		xhr.send(encoded);
	  }
	}
	
	function loaded() {
	  console.log("Contact form submission handler loaded successfully.");
	  // bind to the submit event of our form
	  var forms = document.querySelectorAll("form.gform");
	  for (var i = 0; i < forms.length; i++) {
		forms[i].addEventListener("submit", handleFormSubmit, false);
	  }
	};
	document.addEventListener("DOMContentLoaded", loaded, false);
  
	function disableAllButtons(form) {
	  var buttons = form.querySelectorAll("button");
	  for (var i = 0; i < buttons.length; i++) {
		buttons[i].disabled = true;
	  }
	}
  })();
  

 ////////////////////////////////////////////////////////////shrink effect////////////////////////////////////////////////////////////////////



 var prevScrollpos = window.pageYOffset;
 window.onscroll = function() {
   var currentScrollPos = window.pageYOffset;
   if (prevScrollpos > currentScrollPos) {
	document.getElementById("mainNav").style.opacity='0';
	document.getElementById("mainNav").style.padding = "20px 10px";
	document.getElementById("logo").style.fontSize = "35px";
	document.getElementById("mainNav").style.backgroundColor='#DDDDDD';
	document.getElementById("mainNav").style.boxShadow=' none';
	
   } else {


	document.getElementById("mainNav").style.opacity='1';
	document.getElementById("mainNav").style.padding = "10px 10px";
	document.getElementById("logo").style.fontSize = "25px";
	
	document.getElementById("mainNav").style.boxShadow='-8px 8px 80px -31px rgba(0,0,0,0.75)';
   }
   prevScrollpos = currentScrollPos;
 }

 //////////////////////////////////////////////////////collapse on click/////////////////////////////////////////////////////////////////////
 $('.js-scroll-trigger').click(function() {
	$('.navbar-collapse').collapse('hide');
  });
 //////////////////////////////////////////////////////animation on scroll//////////////////////////////////////////////////////////////
 

 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: false
 });


/////////////////////////////////////////////////////////////service tabs////////////////////////////////////////////////////////////////////////////
$(function() {
	var $a = $(".tabs li");
	$a.click(function() {
		$a.removeClass("active");
		$(this).addClass("active");
	});
});



////////////////////////////////////////////////////////////// navbar toggle//////////////////////////////////////////////////////////////////
$(function () {
	'use strict'

  $("[data-trigger]").on("click", function(){
	  var trigger_id =  $(this).attr('data-trigger');
	  $(trigger_id).toggleClass("show");
	  $('body').toggleClass("offcanvas-active");
  });

  // close if press ESC button 
  $(document).on('keydown', function(event) {
	  if(event.keyCode === 27) {
		 $(".navbar-collapse").removeClass("show");
		 $("body").removeClass("overlay-active");
	  }
  });

  // close button 
  $(".btn-close").click(function(e){
	  $(".navbar-collapse").removeClass("show");
	  $("body").removeClass("offcanvas-active");
  }); 


})




////////////////////////////////////////////////////////scroll effect with scroll spy//////////////////////////////////////////////////

(function($) {
	"use strict"; // Start of use strict
  
	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
	  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
		  $('html, body').animate({
			scrollTop: (target.offset().top - 56)
		  }, 1000, "easeInOutExpo");
		  return false;
		}
	  }
	});
  
	// Closes responsive menu when a scroll trigger link is clicked
	
  
	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
	  target: '#mainNav',
	  offset: 56
	});
  
  })(jQuery); // End of use strict









