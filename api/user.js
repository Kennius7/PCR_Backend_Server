
const { collection, updateDoc, doc, query, where, getDocs } = require("firebase/firestore");
const { db } = require("../FirebaseConfig.js");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");

require('dotenv').config();


const pcrDatabaseSecretKey = process.env.PCR_DATABASE_SECRET_KEY;

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: "pcr-database",
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        databaseURL: 'https://pcr-database.firebaseio.com',
    });
    console.log("Firebase Admin Initialized");
}



export default async function handler(req, res) {
    console.log("Checking...");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
        res.status(200).end();
        console.log("Checking OPTIONS Method...", res.statusCode);
        return;
    }


    // Fetch User Data Block
    if (req.method === "GET" && req?.query?.apiType === "FETCHUSERDATA") {
        try {
            const authHeader = req.headers.authorization;
            console.log("AUTH:>>>>", authHeader);

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                console.log("Access Denied: No token provided");
                return res.status(401).json({ success: false, message: "Access Denied: No token provided" });
            }
    
            const token = authHeader.split("Bearer ")[1];
    
            if (!token) {
                console.log("Access Denied: No token detected!");
                return res.status(401).json({ success: false, message: "Unauthorized!" });
            }

            const user = jwt.verify(token, pcrDatabaseSecretKey, (err, user) => {
                if (err) return res.status(403).send("Invalid Token!");
                req.user = user;
                const userData = req.user;
                return userData;
            })

            console.log("User: >>>>>", user);
            const q = query(collection(db, "PCR-USER-DATA"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            const filteredData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Filtered Data: ", filteredData);
            const { name, email, number } = filteredData[0];
            const fetchedData = { name: name, email: email, number: number };

            console.log("Fetched Data: >>>", fetchedData);
            return res.status(200).json({ data: fetchedData, message: "Data was fetched successfully" });
        } catch (error) {
            console.log("Checking ERROR FETCHING...", res.statusCode, error.message);
            return res.status(500).json({ success: false, message: `Couldn't fetch Data. Error: ${error.message}` });
        }
    }

    if (!['POST', 'GET', 'OPTIONS'].includes(req.method)) {
        console.log("Checking NO METHOD SELECTED...", res.statusCode);
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}




