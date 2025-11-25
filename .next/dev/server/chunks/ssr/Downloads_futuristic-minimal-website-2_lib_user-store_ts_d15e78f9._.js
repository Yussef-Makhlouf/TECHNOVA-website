module.exports = [
"[project]/Downloads/futuristic-minimal-website-2/lib/user-store.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "userStore",
    ()=>userStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$futuristic$2d$minimal$2d$website$2d$2$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/futuristic-minimal-website-2/lib/auth.ts [app-rsc] (ecmascript)");
;
// Initial admin user
const initialUsers = [
    {
        id: "1",
        name: "Admin User",
        email: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$futuristic$2d$minimal$2d$website$2d$2$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FAKE_CREDENTIALS"].email,
        password: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$futuristic$2d$minimal$2d$website$2d$2$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FAKE_CREDENTIALS"].password,
        role: "admin",
        phone: "123-456-7890",
        image: ""
    }
];
// Global variable to store users in memory (server-side)
// Note: This will reset on server restart/rebuild
let users = [
    ...initialUsers
];
const userStore = {
    getAll: ()=>users,
    getByEmail: (email)=>users.find((u)=>u.email === email),
    getById: (id)=>users.find((u)=>u.id === id),
    add: (user)=>{
        const newUser = {
            ...user,
            id: Math.random().toString(36).substr(2, 9)
        };
        users.push(newUser);
        return newUser;
    },
    update: (id, data)=>{
        users = users.map((u)=>u.id === id ? {
                ...u,
                ...data
            } : u);
        return users.find((u)=>u.id === id);
    },
    delete: (id)=>{
        users = users.filter((u)=>u.id !== id);
    },
    verifyCredentials: (email, password)=>{
        const user = users.find((u)=>u.email === email && u.password === password);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }
};
}),
];

//# sourceMappingURL=Downloads_futuristic-minimal-website-2_lib_user-store_ts_d15e78f9._.js.map