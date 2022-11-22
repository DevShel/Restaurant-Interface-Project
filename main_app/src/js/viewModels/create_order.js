/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */



define(['../accUtils', "require", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojarraydataprovider", 
"ojs/ojknockout-keyset", "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils",
"ojs/ojknockout", "ojs/ojknockout-keyset", "ojs/ojselector", "ojs/ojlistitemlayout",
 "ojs/ojavatar", "ojs/ojlistview", "ojs/ojactioncard",  "ojs/ojlabel"],
function(accUtils) {
  
  function OrderViewModel() {
    
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */

      
      
      this.connected = () => {
        document.title = "Create Order";
        get_num_orders();
        update_order_number_element();
        
        // Implement further logic if needed
        

      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
        
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        
      };
      
    }

    
    
    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return OrderViewModel;
  }

  

  
);


var updated_num_orders ;
var burger_val, side_val, drink_val;
var burger_cost = 0, side_cost = 0, drink_cost = 0;
var overall_cost = 0;

function updateNumOrders(new_number){
  updated_num_orders = new_number;
  update_order_number_element();
}

function update_order_number_element(){
  if (updateNumOrders){
      var order_display = updated_num_orders + 1;
      document.getElementById("order_num").textContent = "Order #" + order_display;

  }
}


function select_hamburger(button){
  update_order_number_element();
  if (burger_val){
    document.getElementById(burger_val).chroming = "outlined";
  }

  burger_val = button.id;
  if (burger_val == "Hamburger"){
    burger_cost = 7.00;
  } else if (burger_val == "Cheeseburger"){
    burger_cost = 8.00;
  }
  document.getElementById(burger_val).chroming = "callToAction";
  updateSummary();
  
}


function select_side(button){
  update_order_number_element();
  if (side_val){
    document.getElementById(side_val).chroming = "outlined";
  }
  side_val = button.id;

  if (side_val == "Fries"){
    side_cost = 3.00;
  }else if (side_val == "Cheese Fries"){
    side_cost = 4.00;
  }

  document.getElementById(side_val).chroming = "callToAction";
  updateSummary();
}

function select_drink(button){
  update_order_number_element();
  if (drink_val){
    document.getElementById(drink_val).chroming = "outlined";
  }
  drink_val = button.id;

  if (drink_val == "Water"){
    drink_cost = 1.00;
  } else if (drink_val == "Soda"){
    drink_cost = 2.00;
  }
  
  document.getElementById(drink_val).chroming = "callToAction";
  updateSummary();
}

function clear_hamburger(){
  document.getElementById("Hamburger").chroming = "outlined";
  document.getElementById("Cheeseburger").chroming = "outlined";
  burger_val = "";
  burger_cost = 0;
  updateSummary();
}

function clear_side(){
  document.getElementById("Fries").chroming = "outlined";
  document.getElementById("Cheese Fries").chroming = "outlined";
  side_val = "";
  side_cost = 0;
  updateSummary();
}

function clear_drink(){
  
  document.getElementById("Water").chroming = "outlined";
  document.getElementById("Soda").chroming = "outlined";
  drink_val = "";
  drink_cost = 0;
  updateSummary();
}

function updateSummary(){
    if (burger_val){
      document.getElementById("if_burger").textContent = burger_val + " $" + burger_cost;
    } else{
      document.getElementById("if_burger").textContent = "";
    }
  
    if (side_val){
      document.getElementById("if_side").textContent = side_val + " $" + side_cost;
    } else{
      document.getElementById("if_side").textContent = "";
    }
  
    if (drink_val){
      document.getElementById("if_drink").textContent = drink_val + " $" + drink_cost;
    } else{
      document.getElementById("if_drink").textContent = "";
    }

    overall_cost = burger_cost + side_cost + drink_cost;

  if (order_summary){
    document.getElementById("order_summary").textContent = "";
  }
   else{
    document.getElementById("order_summary").textContent = "No Items Selected";
  }

  
  if (overall_cost >= 0){
    document.getElementById("order_cost_element").textContent = "Order Summary: $" + overall_cost;
  }
 
}





function get_num_orders(){
  var myString = "https://oracle-ojet-restaurant-default-rtdb.firebaseio.com/num_orders.json";
  $.ajax({
    url: myString,
    type: "GET",
    processData: false,
    contentType: "application/json; charset=UTF-8",
  }).done(function(data) {
    updateNumOrders(data);
  });
}

function increase_order_number() {
  get_num_orders();
  updated_num_orders = updated_num_orders + 1;

  var myString = "https://oracle-ojet-restaurant-default-rtdb.firebaseio.com/num_orders.json";
  $.ajax({
    url: myString,
    type: "PUT",
    processData: false,
    contentType: "application/json; charset=UTF-8",
    data: updated_num_orders
  }).done(function(data) {
    console.log("Updated number of orders to: ")
    console.log(data);
    
  });
};



function submit_order() {
  if (overall_cost > 0 ){
    increase_order_number();
  get_num_orders();
  const date = new Date();
  let data = {
    item1: burger_val,
    item2: side_val,
    item3: drink_val,
    item4: overall_cost,
    item5: date
  }

  var myString = "https://oracle-ojet-restaurant-default-rtdb.firebaseio.com/order";
  myString = myString + updated_num_orders +".json";
  $.ajax({
    url: myString,
    type: "PUT",
    processData: false,
    contentType: "application/json; charset=UTF-8",
    data: JSON.stringify(data)
  }).done(function(data) {
    console.log("Put to database: ")
    console.log(data);
    
  });
  clear_hamburger();
  clear_side();
  clear_drink();
  } else{
    document.getElementById("buttonAlert").innerText = "Cannot Submit Empty Order";
    setTimeout(function(){
     
      document.getElementById("buttonAlert").innerText = "";
    }, 2000);
  }
  
};

function refreshThePage(){
    window.location.href = window.location.href;
 }   