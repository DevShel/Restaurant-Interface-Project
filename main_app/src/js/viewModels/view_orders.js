/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */

var is_table_loaded = false;

define(["ojs/ojarraydataprovider", 'ojs/ojlistdataproviderview', '../accUtils', 
"require", "exports", "knockout", "ojs/ojbootstrap", 
"ojs/ojknockout-keyset", "ojs/ojresponsiveutils", "ojs/ojresponsiveknockoututils",
"ojs/ojknockout", "ojs/ojselector", "ojs/ojlistitemlayout",
 "ojs/ojavatar", "ojs/ojlistview", "ojs/ojactioncard",  "ojs/ojlabel", 'ojs/ojcore',
  'jquery', 'ojs/ojtable', 'ojs/ojgauge', 'ojs/ojtimezonedata',
 'ojs/ojvalidation-datetime', 'ojs/ojvalidation-number'],
function(ArrayDataProvider, ListDataProviderView, oj, ko) {
    "use strict";
    function ViewOrdersViewModel() {
      var self = this;
      
      this.dataprovider = new ArrayDataProvider(orderArray, { keyAttributes: "order_number" });
    
        
   

      // Initialize array with get request values

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


       
       
      self.connected = function() {
        document.title = "View Orders";
        if (is_table_loaded == false){
          get_num_orders_for_display();
          is_table_loaded = true;
        }
        
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed

      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
        
        
      };
    }
    
    

    

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    
    return new ViewOrdersViewModel();
  }
);

var already_loaded = false;
var orderArray = [];
var updated_num_of_orders;

this.columnArray = [{
  "headerText": "Order #",
  "field": "order_number"
},
{
  "headerText": "Items",
  "field": "order_items"
},
{
  "headerText": "Cost",
  "field": "order_cost",
},
{
  "headerText": "Time",
  "field": "order_time",
},
{
  "headerText": "Date",
  "field": "order_date",
}
];


 function get_num_orders_for_display(){
  var myString = "https://oracle-ojet-restaurant-default-rtdb.firebaseio.com/num_orders.json";
  $.ajax({
    url: myString,
    type: "GET",
    processData: false,
    contentType: "application/json; charset=UTF-8",
  }).done(function(data) {
    populate_table(data);
  });
}




function populate_table(updated_val){

  function send_request(url, i){
    return new Promise(resolve=>{
        $.ajax({
    url: url,
    type: "GET",
    processData: false,
    contentType: "application/json; charset=UTF-8",
      }).done(function(data) {
    let order_num_table, order_items_table = "", order_cost_table, order_time_table, order_date_table;

    
    if (data){
      if (data.item1){
        order_items_table += data.item1 + " ";
      } 
      if (data.item2){
        order_items_table+= data.item2 + " ";
      } 
      if (data.item3){
        order_items_table+= data.item3 + " ";
      }
      if (data.item4){
        order_cost_table = data.item4;
      }
      if (data.item5){
        var date = new Date(data.item5);
        order_time_table = date.toLocaleTimeString("en-US");
        order_date_table = date.toLocaleDateString("en-US");
      }
      addToArray(i, order_items_table, order_cost_table, order_time_table, order_date_table);
    }
    resolve();
      });
      
      
  });
    
    
}

  var request_promises = [];
  for (let i = 1; i <= updated_val; i++){
    var urlString = "https://oracle-ojet-restaurant-default-rtdb.firebaseio.com/order" + i + ".json";
    request_promises.push(send_request(urlString, i));
  }  
  Promise.all(request_promises).then(()=>{
    document.body.setAttribute("finished", true);
  })
  
}


function addToArray(order_num_table, order_items_table, order_cost_table, order_time_table, order_date_table){
  orderArray.push({
    order_number: order_num_table,
    order_items: order_items_table,
    order_cost: order_cost_table,
    order_time: order_time_table,
    order_date: order_date_table
  })
 }
 if (is_table_loaded == false){
  get_num_orders_for_display();
  is_table_loaded = true;
}
 function refreshThePage(){
    window.location.href = window.location.href;
 }   


