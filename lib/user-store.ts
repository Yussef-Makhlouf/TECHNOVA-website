import { FAKE_CREDENTIALS } from "./auth"

export type User = {
    id: string
    name: string
    email: string
    password: string // In a real app, this should be hashed
    role: "admin" | "user"
    phone?: string
    image?: string
}

// Initial admin user
const initialUsers: User[] = [
    {
        id: "1",
        name: "Admin User",
        email: FAKE_CREDENTIALS.email,
        password: FAKE_CREDENTIALS.password,
        role: "admin",
        phone: "123-456-7890",
        image: "",
    },
]

// Global variable to store users in memory (server-side)
// Note: This will reset on server restart/rebuild
let users: User[] = [...initialUsers]

export const userStore = {
    getAll: () => users,

    getByEmail: (email: string) => users.find((u) => u.email === email),

    getById: (id: string) => users.find((u) => u.id === id),

    add: (user: Omit<User, "id">) => {
        const newUser = { ...user, id: Math.random().toString(36).substr(2, 9) }
        users.push(newUser)
        return newUser
    },

    update: (id: string, data: Partial<User>) => {
        users = users.map((u) => (u.id === id ? { ...u, ...data } : u))
        return users.find((u) => u.id === id)
    },

    delete: (id: string) => {
        users = users.filter((u) => u.id !== id)
    },

    verifyCredentials: (email: string, password: string) => {
        const user = users.find((u) => u.email === email && u.password === password)
        if (user) {
            const { password, ...userWithoutPassword } = user
            return userWithoutPassword
        }
        return null
    },
}
