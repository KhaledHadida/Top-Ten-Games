import cookie from 'js-cookie';

// Evaluate this with Yunxian 
export  function setCookie(name, value, days) {
    console.log('Cookie accepted?');
    //Apparently we need to secure the 3rd party cookie according to mozilla firefox so I added the extra security
    cookie.set(name, value, {SameSite:'None', secure:true,expires: days});
    return true;
}

// Function to read a cookie by name
export function getCookie(name) {
    // Get a cookie
    const myCookieValue = cookie.get(name);
    if (myCookieValue == null) {
        console.log(`null?`);
        return null;
    } else {
        // console.log(`Cookie Name ${name} and value is ${myCookieValue}`);
        return myCookieValue;
    }
}

//Delete cookie
export function deleteCookie(name){
    try{
        //Try to delete cookie
        cookie.remove(name);
    }catch(error){
        console.log(`Cookie Name ${name} does not exist.`);
    }
}
