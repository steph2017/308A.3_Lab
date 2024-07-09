// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";



/* PART 1:
Your job is to assemble this information using a single function that takes an id parameter and returns a Promise that resolves to an object containing specific data.
The object must contain the following information, which will be gathered from the databases:
{
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: string,
        lng: string
      }
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    }
}

*/

async function getUserData(id) {
    const userInfo = {};
    const dbs = {
        // db1: (() => {                           //immediately invoking an anonymous function  - learned online
        //     try {
        //         return db1(id);
        //     } catch (err) { }
        // })(),
        db1,
        db2,
        db3,
        vault: await vault(id)
    };

    // dbs.db1 = await dbs.db1;
    // dbs.db2 = await dbs.db2;
    // dbs.db3 = await dbs.db3;


    const returnedValue = await central(id);

    try {
        switch (true) {
            case returnedValue == "db1":
                dbs.db1 = await db1(id);
                userInfo.name = dbs.vault.name;
                // const { username } = await db1(id); //object destructuring format - provided by Nadir
                userInfo.username = dbs.db1.username;
                userInfo.email = dbs.vault.email;
                userInfo.address = dbs.vault.address;
                userInfo.phone = dbs.vault.phone;
                userInfo.website = dbs.db1.website;
                userInfo.company = dbs.db1.company;
                break;
            case returnedValue == "db2":
                dbs.db1 = await db2(id);
                userInfo.name = dbs.vault.name;
                // const { username } = await db1(id); //object destructuring format - provided by Nadir
                userInfo.username = dbs.db3.username;
                userInfo.email = dbs.vault.email;
                userInfo.address = dbs.vault.address;
                userInfo.phone = dbs.vault.phone;
                userInfo.website = dbs.db2.website;
                userInfo.company = dbs.db2.company;
                break;
            case returnedValue == "db3":
                dbs.db1 = await db3(id);
                userInfo.name = dbs.vault.name;
                // const { username } = await db1(id); //object destructuring format - provided by Nadir
                userInfo.username = dbs.db3.username;
                userInfo.email = dbs.vault.email;
                userInfo.address = dbs.vault.address;
                userInfo.phone = dbs.vault.phone;
                userInfo.website = dbs.db3.website;
                userInfo.company = dbs.db3.company;
                break;
            default:

        }
        console.log(userInfo);
        return userInfo;
    }
    catch (err) {
        console.log(err);
    }
}

getUserData(2);