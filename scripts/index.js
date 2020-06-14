// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });

  
    var form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
      console.log("Saving value", form.elements.empno.value);
      event.preventDefault();
    });
  
