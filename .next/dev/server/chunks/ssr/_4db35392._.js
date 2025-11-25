module.exports = [
"[project]/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_COOKIE_NAME",
    ()=>AUTH_COOKIE_NAME,
    "AUTH_COOKIE_VALUE",
    ()=>AUTH_COOKIE_VALUE,
    "FAKE_CREDENTIALS",
    ()=>FAKE_CREDENTIALS
]);
const AUTH_COOKIE_NAME = "technova_auth_token";
const AUTH_COOKIE_VALUE = "authenticated";
const FAKE_CREDENTIALS = {
    email: "admin@technova.com",
    password: "password123"
};
}),
"[project]/app/login/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00751cb60d5dbe0503fc7f8ce404a35109ed477e9c":"logout","40db24ea2f485bebc97f35e9fe8b84c73d5b638cee":"login"},"",""] */ __turbopack_context__.s([
    "login",
    ()=>login,
    "logout",
    ()=>logout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const loginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
});
async function login(data) {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
        return {
            success: false,
            error: "Invalid input"
        };
    }
    const { email, password } = result.data;
    // Use userStore to verify credentials
    // We need to import userStore dynamically or ensure it's available on server
    // Since this is a server action, it runs on server.
    // However, importing from a file that has global state might be tricky in Next.js server actions due to isolation.
    // But for a simple demo with "use server", module level variables might persist or might not depending on deployment.
    // For local dev, it usually works but might reset on recompile.
    // We'll import it at the top level, but for now let's assume standard import works.
    const { userStore } = await __turbopack_context__.A("[project]/lib/user-store.ts [app-rsc] (ecmascript, async loader)");
    const user = userStore.verifyCredentials(email, password);
    if (user) {
        // Set cookie with user email/id to identify them
        // In a real app, use a signed JWT or session ID
        const cookieValue = JSON.stringify({
            id: user.id,
            email: user.email,
            role: user.role
        });
        (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AUTH_COOKIE_NAME"], cookieValue, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });
        return {
            success: true
        };
    }
    return {
        success: false,
        error: "Invalid email or password"
    };
}
async function logout() {
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).delete(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AUTH_COOKIE_NAME"]);
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    login,
    logout
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(login, "40db24ea2f485bebc97f35e9fe8b84c73d5b638cee", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "00751cb60d5dbe0503fc7f8ce404a35109ed477e9c", null);
}),
"[project]/lib/user-store.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "userStore",
    ()=>userStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
;
// Initial admin user
const initialUsers = [
    {
        id: "1",
        name: "Admin User",
        email: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FAKE_CREDENTIALS"].email,
        password: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FAKE_CREDENTIALS"].password,
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
"[project]/app/dashboard/users/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"405130bea945612de92122698af8ff3dfcff9838f6":"createUser","4090151db045ec1532cf149eb30962466438cb5434":"updatePassword"},"",""] */ __turbopack_context__.s([
    "createUser",
    ()=>createUser,
    "updatePassword",
    ()=>updatePassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/user-store.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
const createUserSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email(),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    image: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6)
});
async function createUser(data) {
    // Verify admin
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const authCookie = cookieStore.get(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AUTH_COOKIE_NAME"]);
    if (!authCookie) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        const userSession = JSON.parse(authCookie.value);
        // In a real app, verify against DB again
        const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["userStore"].getById(userSession.id);
        if (!currentUser || currentUser.role !== "admin") {
            return {
                success: false,
                error: "Unauthorized: Admin access required"
            };
        }
    } catch (e) {
        return {
            success: false,
            error: "Invalid session"
        };
    }
    // Check if email exists
    if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["userStore"].getByEmail(data.email)) {
        return {
            success: false,
            error: "Email already exists"
        };
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["userStore"].add({
        ...data,
        role: "user"
    });
    return {
        success: true
    };
}
const updatePasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    currentPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    newPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6)
});
async function updatePassword(data) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const authCookie = cookieStore.get(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AUTH_COOKIE_NAME"]);
    if (!authCookie) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    try {
        const userSession = JSON.parse(authCookie.value);
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["userStore"].getById(userSession.id);
        if (!user) {
            return {
                success: false,
                error: "User not found"
            };
        }
        if (user.password !== data.currentPassword) {
            return {
                success: false,
                error: "Incorrect current password"
            };
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["userStore"].update(user.id, {
            password: data.newPassword
        });
        return {
            success: true
        };
    } catch (e) {
        return {
            success: false,
            error: "Invalid session"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createUser,
    updatePassword
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createUser, "405130bea945612de92122698af8ff3dfcff9838f6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePassword, "4090151db045ec1532cf149eb30962466438cb5434", null);
}),
"[project]/.next-internal/server/app/dashboard/users/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/login/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/dashboard/users/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/login/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$users$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/users/actions.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/.next-internal/server/app/dashboard/users/create/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/login/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/dashboard/users/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00751cb60d5dbe0503fc7f8ce404a35109ed477e9c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "405130bea945612de92122698af8ff3dfcff9838f6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$users$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createUser"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$users$2f$create$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$dashboard$2f$users$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/users/create/page/actions.js { ACTIONS_MODULE0 => "[project]/app/login/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/dashboard/users/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$login$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/login/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$dashboard$2f$users$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/dashboard/users/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_4db35392._.js.map