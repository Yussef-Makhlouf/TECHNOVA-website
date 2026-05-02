import NewPasswordForm from "./NewPasswordForm"

export default async function NewPasswordPage({ params }: { params: Promise<{ token: string; locale: string }> }) {
    const { token } = await params

    return <NewPasswordForm token={token} />
}
