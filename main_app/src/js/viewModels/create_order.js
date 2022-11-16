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
       var last_hamburger = 0;

      
      

      this.connected = () => {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Create Order";

        
        
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
        // Implement if needed
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

var burger_val, side_val, drink_val;
var burger_cost = 0, side_cost = 0, drink_cost = 0;
var overall_cost;
let final_order = "";

function select_hamburger(button){
  if (burger_val != null){
    document.getElementById(burger_val).chroming = "outlined";
  }

  burger_val = button.id;
  if (burger_val == "Hamburger"){
    burger_cost = 7.00;
  } else if (burger_val == "Cheeseburger"){
    burger_cost = 8.00;
  }
  document.getElementById(burger_val).chroming = "callToAction";
  updateSummary(final_order);
  
}

function select_side(button){
  if (side_val != null){
    document.getElementById(side_val).chroming = "outlined";
  }
  side_val = button.id;

  if (side_val == "Fries"){
    side_cost = 3.00;
  }else if (side_val == "Cheese Fries"){
    side_cost = 4.00;
  }

  document.getElementById(side_val).chroming = "callToAction";
  updateSummary(final_order);
}

function select_drink(button){
  if (drink_val != null){
    document.getElementById(drink_val).chroming = "outlined";
  }
  drink_val = button.id;

  if (drink_val == "Water"){
    drink_cost = 1.00;
  } else if (drink_val == "Soda"){
    drink_cost = 2.00;
  }
  
  document.getElementById(drink_val).chroming = "callToAction";
  updateSummary(final_order);
}

function updateSummary(final_order){
  
    if (burger_val){
      document.getElementById("if_burger").textContent = burger_val + " $" + burger_cost;
    }
  
    if (side_val){
      document.getElementById("if_side").textContent = side_val + " $" + side_cost;
    }
  
    if (drink_val){
      document.getElementById("if_drink").textContent = drink_val + " $" + drink_cost;
    }

    overall_cost = burger_cost + side_cost + drink_cost;

  if (order_summary){
    document.getElementById("order_summary").textContent = final_order;
  }
   else{
    document.getElementById("order_summary").textContent = "No Items Selected";
  }
  
  if (overall_cost > 0 ){
    document.getElementById("order_cost_element").textContent = "Order Summary: $" + overall_cost;
  }
 
}

// function connect_to_db(){
//   const http = require("http");
//   var mysql = require("mysql");

//   var con = mysql.createConnection({
//   host     : 'server1.shel.io',
//   user     : 'shel_oracle_food_user',
//   password : 'shel_oracle_food_user',
//   database : 'shel_food_database'
//   });
//   // Create an instance of the http server to handle HTTP requests
//   let app = http.createServer((req, res) => {
//   // Set a response type of plain text for the response
//   res.writeHead(200, {'Content-Type': 'text/plain'});

//   // Send back a response and end the connection
//   //res.end('Hello World!\n'); // comment this line   
//   con.connect(function(err) {
//   if (err) throw err;
//   res.end('Connected!');
//   }); 

//   });

//   // Start the server on port 3000
//   app.listen(3000, '127.0.0.1');
// }



// function submit_order(){
//     connect_to_db();
// }


