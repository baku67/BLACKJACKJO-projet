
    
// Lié au get-data.php  (https://stackoverflow.com/questions/23740548/how-do-i-pass-variables-and-data-from-php-to-javascript)
 
    // function reqListener () {
    //   console.log(this.responseText);
    // }

    // var oReq = new XMLHttpRequest(); // New request object
    // oReq.onload = function() {
    //     // This is where you handle what to do with the response.
    //     // The actual data is found on this.responseText
    //     alert(this.responseText); // Will alert: 42
    // };
    // oReq.open("get", "get-data.php", true);
    // //                               ^ Don't block the rest of the execution.
    // //                                 Don't wait until the request finishes to
    // //                                 continue.
    // oReq.send();



// Ajax

// $.ajax({
//     type: 'POST',
//     dataType: "json",
//     url:'get-data.php',
//     // data: 
//     success: function(data)
//     {
//      try {
//         data = JSON.parse(data);
//       }catch(e) {}
//       console.log(data);
//     }
// });