const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
require('./database/connections');

const authRoute1 = require('./routers/users');
const authRoute2 = require('./routers/tutors');
const authRoute3 = require('./routers/students');

app.use('/api/v1', authRoute1, authRoute2, authRoute3);
// const ipAddress = '192.168.1.38';

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
})

//------------------------------------------------------------------------------------------------------------

function findFrequency(str) {
    let c = 0, obj = {}, ch;
    for (let i = 0; i < str.length; i++) {
        if (str[i] != ' ') {
             if(obj[str[i]])
             {
                obj[str[i]]+= 1;
             }
             else
             {
                console.log(obj[str[i]]);
                obj[str[i]]=1;
             }
        }
    }
    return obj;
    // }
}

// Example usage
const inputString = "hello world";
// console.log(findFrequency(inputString));



// let student = {
//     firstName : 'Sheldon',
//     lastName : 'Cooper',
//     address: {
//         street: {
//             line1 : 'AK road',
//             line: 'Andheri'
//         },
//         city: 'Mumbai'
//     }
// }

// let studentDetails={};
// studentDetails= student;
// console.log(studentDetails);

// studentDetails.address.city='Delhi';
// console.log(student);
// console.log(studentDetails);




let student = {
    firstName: 'Sheldon',
    lastName: 'Cooper',
    address: {
        street: {
            line1: 'AK road',
            line2: 'Andheri'
        },
        city: 'Mumbai'
    }
};
let studentDetails = student;
// console.log(studentDetails);

studentDetails.city = 'Hyderabad';
// console.log(studentDetails);
// console.log(student);

// Deep copy and shallow copy in javascript
let studentDetails2 = JSON.parse(JSON.stringify(student));

let arr = [1,2,3,4,5,6,7];
// console.log(...arr);
let newArr = [...arr];
// newArr[0]=0
// console.log(newArr);
const final = [...newArr,8,9];
// console.log(final);
// console.log(arr);
const myArray = [1, "two", { key: "value" }];
// console.log(myArray);


var x = 24;
var y = "21";
console.log(x-y);



