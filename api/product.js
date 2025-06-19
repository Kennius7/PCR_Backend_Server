
const { doc, updateDoc, collection, getDocs, getDoc } = require("firebase/firestore");
const { db } = require("../FirebaseConfig.js");

require('dotenv').config();


export default async function handler(req, res) {
    console.log("Checking...");
    // console.log("Request API Type:>>>", req?.body?.apiType);
    console.log("Request API Type:>>>", req?.query?.apiType);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (req.method === "OPTIONS") {
        res.status(200).end();
        console.log("Checking OPTIONS Method...", res.statusCode);
        return;
    }

    // Post Products (Initial Data) Block
    if (req.method === "POST" && req?.body?.apiType === "POST_INIT_PROPERTY_DATA") {
        try {
            const { companyName, companyType, headerTitle, officeAddress, 
                officeEmail, phoneNumberData, officeWebsite, propertyData } = req.body;
            const docRef = doc(db, "PCR-DATA", "PropertyData");
            await updateDoc(docRef, { companyName, companyType, headerTitle, officeAddress, 
                officeEmail, phoneNumberData, officeWebsite, propertyData });
            const message = `Successfully posted initial data`;
            console.log(message);
            return res.status(200).json({ success: true, message: message });
        } catch (error) {
            console.log("Checking POST Method ERROR...", res.statusCode);
            console.log(error);
            return res.status(500).json({ error: `Error: ${error.message}` });
        }
    }

    // Post Products (Saved Data) Block
    if (req.method === "POST" && req?.body?.apiType === "POST_SAVED_PROPERTY_DATA") {
        try {
            const { companyName, companyType, headerTitle, officeAddress, 
                officeEmail, phoneNumberData, officeWebsite, propertyData } = req.body;
            const docRef = doc(db, "PCR-DATA", "PropertyData");
            await updateDoc(docRef, { companyName, companyType, headerTitle, officeAddress, 
                officeEmail, phoneNumberData, officeWebsite, propertyData });
            const message = `Successfully posted initial data`;
            console.log(message);
            return res.status(200).json({ success: true, message: message });
        } catch (error) {
            console.log("Checking POST Method ERROR...", res.statusCode);
            console.log(error);
            return res.status(500).json({ error: `Error: ${error.message}` });
        }
    }

    //Fetch Products Data Block
    if (req.method === "GET" && req.query.apiType === "GETPRODUCTS") {
        try {
            const querySnapshot = await getDocs(collection(db, "PCR-DATA"));
            const filteredData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Filtered Data: ", filteredData);
            // const allProducts = filteredData[0].allProducts;
            // console.log("Arrayed Data:>>>>", allProducts);
            return res.status(200).json({ data: filteredData, message: "Data was fetched successfully" });
        } catch (error) {
            console.log("Checking ERROR FETCHING...", res.statusCode, error.message);
            return res.json({ error: `Couldn't fetch Data. Error: ${error.message}` });
        }
    }

    if (!['POST', 'GET', 'OPTIONS'].includes(req.method)) {
        console.log("Checking NO METHOD SELECTED...", res.statusCode);
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}



