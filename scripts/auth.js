//var users = db.collection('users');
// users.doc("dfK0wc9Smcgkth4SgnRq").get().then(doc => {
//     console.log(doc.data().Name); 
// })

//listen for auth method changes
auth.onAuthStateChanged(user =>{
  if(user){
      console.log('user logged in' , user, user.email);
      db.collection("users").onSnapshot(snap => {
      snap.forEach(doc => {
        console.log(doc.data());
        console.log(doc.data().email);
        var x = doc.data().email;
        var y = user.email;
        if(x==y){
            var nm = doc.data().Name;
            console.log(nm);
        }
        document.querySelector('#guide').innerHTML = "Welcome" + nm;
        if(doc.data().email==user.email && doc.data().account_type=="operator"){
            console.log("its operator");
          document.querySelector('#guide').style.display = "block";
          document.querySelector('#empnoandamt').style.display = "block";
          document.querySelector('#getempno').style.display = "block";
          document.querySelector('#getamt').style.display = "block";
          document.querySelector('#btn_to_update').style.display = "block";
        }
        else if(doc.data().email==user.email && doc.data().account_type=="user"){
            document.querySelector('#user_display').style.display = "block";
            document.querySelector('#welcome_user').style.display = "block";
            document.querySelector('#petrolpump_amt').style.display = "block";
            document.querySelector('#welcome_user').innerHTML = "Welcome" + " " + doc.data().Name;
            var query = db.collection("users").where("email", "==", user.email);
            query.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var x = doc.data().employeeno;
                    console.log(x);
                    db.collection("petrolpump operator").where("employeeno", "==", x)
                      .get()
                      .then(function(querySnapshot) {
                           querySnapshot.forEach(function(doc) {
                            document.querySelector('#petrolpump_amt').innerHTML = doc.data().Total_charge; 
                            console.log(doc.data());
                        });
                     })
                });
            })
            // document.querySelector('#petrolpump_amt').innerHTML =  
        }
    });
});
         
      
     
  }
  else{
      console.log('user logged out');
      document.querySelector('#guide').style.display = "none";
      document.querySelector('#getamt').style.display = "none";
      document.querySelector('#getempno').style.display = "none";
      document.querySelector('#btn_to_update').style.display = "none";
      document.querySelector('#user_display').style.display = "none";
      document.querySelector('#welcome_user').style.display = "none";
      document.querySelector('#petrolpump_amt').style.display = "none";
  }
});

a="";
function update(){
    console.log('hello');
    const form = document.querySelector("#empnoandamt");
    var user = firebase.auth().currentUser;
    db.collection("users").where("email" , "==" , user.email).get().then(function(querySnapshot){
       querySnapshot.forEach(function(doc){
            var b = doc.data().collection_linked;
           console.log(b);
           var val = form['getempno'].value;
    var amt = form['getamt'].value;
    console.log(amt,val);
    //var c = "petrolpump operator";
     db.collection(b).where("employeeno" , "==" , val).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
        var y = doc.data().Total_charge;
        var amt = form['getamt'].value;
        var integer = parseInt(amt);
        console.log(y, integer);
        console.log("hi");
        var new_sum = y + integer;
        var x = doc.id;
         db.collection(b).doc(x).update({
         "Total_charge": new_sum
            });
        }); 
    });
           //a = [a , b].join("");
          //console.log(a);
       })
    })
    
    //console.log(b);
    // db.collection("users").doc("mario")
    // var val = form['getempno'].value;
    // var amt = form['getamt'].value;
    // console.log(amt);
    // var c = "petrolpump operator";
    //  db.collection(c).where("employeeno" , "==" , val).get().then(function(querySnapshot){
    //     querySnapshot.forEach(function(doc){
    //     var y = doc.data().Total_charge;
    //     var amt = form['getamt'].value;
    //     var integer = parseInt(amt);
    //     console.log(y, integer);
    //     var new_sum = y + integer;
    //     var x = doc.id;
    //      db.collection(c).doc(x).update({
    //      "Total_charge": new_sum
    //         });
    //     }); 
    // });
    //.get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //         var y = doc.data().Total_charge;
    //         var new_sum = y + amt;
    //         var x = doc.id;
    //         db.collection("petrolpump operator").doc(x).update({
    //                             "Total_charge": new_sum
    //                         });
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
    
    // db.collection("petrolpump operator").onSnapshot(snap => {
//             snap.forEach(doc => {
//           if(val==doc.data().employeeno){
//               console.log('hello bitch');
//               var x = doc.id;
//               var y = doc.data().Total_charge;
//               var new_sum = y + amt;
//               //console.log(y);
//               db.collection("petrolpump operator").doc(x).update({
//                 "Total_charge": new_sum
//             });
            
//           }
//       });
//   });
// var form = document.querySelector("form");
//     form.addEventListener("submit", function(event) {
//       console.log("Saving value", form.elements.empno.value);
//       event.preventDefault();
//     });
window.alert('Updated successfully');
//window.location.reload();
//form.reset();
}

//signup form, get id of form tag for signup form
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener( 'submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm[ 'signup-email'].value;
    const password = signupForm['signup-password'].value;
    // if(password.size<=4){
    //     signupForm['passwordalert'].innerHTML="Password must be strictly greater than 5 characters";
    // }
    //signup the user
    auth.createUserWithEmailAndPassword(email, password).then( cred => {
        console.log(cred.user);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit' , (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword( email, password).then(cred => {
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    
    })
})
