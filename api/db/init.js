const AdminModel = require('../models/admin')
const NavModel = require('../models/navigation');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const initialize = async () => {
    const admin_in_db = await AdminModel.findOne({ name: process.env.SUPER_ADMIN })
    if (!admin_in_db) {
        AdminModel.create({ 
            name: process.env.SUPER_ADMIN, 
            password: await bcryptjs.hash(process.env.SUPER_ADMIN_PASSWORD, 10) 
        }); 
    };

    const navs = [
        { title: 'Pradžia', link: '/', order_no: 1 },
        { title: 'Apie', link: '/about', order_no: 2 },
        // { title: 'Produktai', link: '/products', order_no: 2 }
    ];
    for (let n of navs) {
        const nav_in_db = await NavModel.findOne({ title: n.title })
        if (!nav_in_db) NavModel.create(n);
    }
    // NavModel.insertMany(navs);
};
// const initialize = async () => {
//     const admin_in_db = await AdminModel.findOne({ name: process.env.SUPER_ADMIN })
//     if (!admin_in_db) {
//         AdminModel.create({ 
//             name: process.env.SUPER_ADMIN, 
//             password: await bcryptjs.hash(process.env.SUPER_ADMIN_PASSWORD, 10) 
//         }); 
//     };

//     const navs = [
//         { title: 'Pradžia', link: '/', order_no: 1 },
//         { title: 'Apie', link: '/about', order_no: 2 },
//         { title: 'Produktai', link: '/products', order_no: 2 }
//     ];
//     for (let n of navs) {
//         const nav_in_db = await NavModel.findOne({ title: n.title })
//         if (!nav_in_db) NavModel.create(n);
//     }
//     // NavModel.insertMany(navs);
// };

module.exports = initialize;